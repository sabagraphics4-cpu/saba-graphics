import urllib.request
import urllib.parse
import http.cookiejar

def test_backend():
    base_url = "http://127.0.0.1:5000"
    
    # 1. Test Contact Form Submission
    print("Testing Contact Form...")
    data = urllib.parse.urlencode({
        "name": "VerificationBot",
        "email": "bot@example.com",
        "phone": "555-0199",
        "message": "This is a verification message."
    }).encode()
    
    req = urllib.request.Request(f"{base_url}/contact", data=data)
    try:
        with urllib.request.urlopen(req) as response:
            result = response.read().decode()
            print(f"Contact Form Response: {result}")
            if "Message sent successfully" in result:
                print("PASS: Contact form verified.")
            else:
                print("FAIL: Contact form submission failed.")
    except Exception as e:
        print(f"FAIL: Contact form error: {e}")

    # 2. Test Admin Login and Dashboard
    print("\nTesting Admin Login...")
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    
    login_data = urllib.parse.urlencode({
        "username": "admin",
        "password": "password123"
    }).encode()
    
    login_url = f"{base_url}/login"
    try:
        response = opener.open(login_url, login_data)
        # Check if redirected to admin
        if response.url == f"{base_url}/admin":
            print("PASS: Login successful, redirected to admin.")
            content = response.read().decode()
            if "VerificationBot" in content:
                 print("PASS: Verified contact message is visible in admin dashboard.")
            else:
                 print("FAIL: Contact message NOT found in admin dashboard.")
        else:
             print(f"FAIL: Login did not redirect to admin. Current URL: {response.url}")
    except Exception as e:
        print(f"FAIL: Login error: {e}")

if __name__ == "__main__":
    test_backend()
