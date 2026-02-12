from flask import Flask, render_template, request, jsonify
import os
import subprocess

app = Flask(__name__)

# Route for the Home Page
@app.route('/')
def index():
    return render_template('index.html')

# Route for handling contact form submissions (Mockup for now)
@app.route('/contact', methods=['POST'])
def contact():
    data = request.form
    # In a real app, we would send an email or save to DB here
    return jsonify({"status": "success", "message": "Message received!"})

# Route for C++ Module Integration
@app.route('/process_data', methods=['POST'])
def process_data():
    try:
        # Example of calling the C++ executable
        # Ensure the cpp_module/processor.exe exists and is compiled
        result = subprocess.check_output(['./cpp_module/processor.exe', 'test_input'], text=True)
        return jsonify({"status": "success", "cpp_output": result.strip()})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
