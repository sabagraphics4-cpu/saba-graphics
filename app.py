from flask import Flask, render_template, request, jsonify, session, redirect, url_for, g
import os
import subprocess
import sqlite3
from functools import wraps

app = Flask(__name__)
app.secret_key = 'saba_graphics_secret_key'  # Change this in production
DATABASE = 'saba_graphics.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                message TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS quotes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                service TEXT NOT NULL,
                details TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        db.commit()

# Initialize DB on startup
init_db()

# Login Decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

# Route for the Home Page
@app.route('/')
def index():
    portfolio_dir = os.path.join('static', 'images', 'portfolio')
    images = []
    if os.path.exists(portfolio_dir):
        for root, dirs, files in os.walk(portfolio_dir):
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                    # Get relative path from portfolio_dir
                    rel_path = os.path.relpath(os.path.join(root, file), portfolio_dir)
                    # Use forward slashes for web URLs regardless of OS
                    images.append(rel_path.replace('\\', '/'))
    return render_template('index.html', portfolio_images=images)

# Route for handling contact form submissions
@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.form
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        message = data.get('message')

        db = get_db()
        cursor = db.cursor()
        cursor.execute('INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
                       (name, email, phone, message))
        db.commit()
        return jsonify({"status": "success", "message": "Message sent successfully!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Route for handling quote form submissions
@app.route('/quote', methods=['POST'])
def quote():
    try:
        data = request.form
        service = data.get('service')
        details = data.get('details')

        db = get_db()
        cursor = db.cursor()
        cursor.execute('INSERT INTO quotes (service, details) VALUES (?, ?)',
                       (service, details))
        db.commit()
        return jsonify({"status": "success", "message": "Quote request sent successfully!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Admin Login Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # Simple hardcoded credentials for demo
        if username == 'admin' and password == 'password123':
            session['logged_in'] = True
            return redirect(url_for('admin'))
        else:
            return render_template('login.html', error="Invalid credentials")
    return render_template('login.html')

# Admin Logout Route
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

# Admin Dashboard Route
@app.route('/admin')
@login_required
def admin():
    db = get_db()
    cursor = db.cursor()
    contacts = cursor.execute('SELECT * FROM contacts ORDER BY timestamp DESC').fetchall()
    quotes = cursor.execute('SELECT * FROM quotes ORDER BY timestamp DESC').fetchall()
    return render_template('admin.html', contacts=contacts, quotes=quotes)

# Route for C++ Module Integration
@app.route('/process_data', methods=['POST'])
def process_data():
    try:
        # Determine the executable path based on OS
        if os.name == 'nt':  # Windows
            executable_path = './cpp_module/processor.exe'
        else:  # Linux/Unix (Render)
            executable_path = './cpp_module/processor'

        # Check if executable exists
        if not os.path.exists(executable_path):
             return jsonify({"status": "error", "message": f"Executable not found at {executable_path}"})

        # Example of calling the C++ executable
        # Ensure the cpp_module/processor.exe (or processor) exists and is compiled
        result = subprocess.check_output([executable_path, 'test_input'], text=True)
        return jsonify({"status": "success", "cpp_output": result.strip()})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
