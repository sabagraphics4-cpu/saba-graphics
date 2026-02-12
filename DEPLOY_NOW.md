# 🚀 SUPER EASY DEPLOYMENT STEPS

Follow these steps EXACTLY and your website will be live in 15 minutes!

## ✅ STEP 1: Check Git Installation

I'm checking if Git is installed...

If Git is NOT installed:
1. Download from: https://git-scm.com/download/win
2. Install with default settings
3. Restart your computer
4. Come back to this guide

---

## ✅ STEP 2: Create GitHub Account (2 minutes)

1. Go to: https://github.com
2. Click "Sign Up"
3. Enter your email (use: saba.graphics4@gmail.com)
4. Create a password
5. Verify your email

---

## ✅ STEP 3: Initialize Git Repository

Open Command Prompt and run these commands ONE BY ONE:

```bash
cd "c:\Users\pc2\Documents\saba graphics"
git init
git add .
git commit -m "Initial commit - Saba Graphics website"
```

---

## ✅ STEP 4: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `saba-graphics`
3. Description: "Professional design services website"
4. Keep it PUBLIC
5. DO NOT initialize with README
6. Click "Create repository"

---

## ✅ STEP 5: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/saba-graphics.git
git branch -M main
git push -u origin main
```

**Replace YOUR_USERNAME** with your actual GitHub username!

When prompted for credentials:
- Username: Your GitHub username
- Password: Your GitHub password (or Personal Access Token)

---

## ✅ STEP 6: Deploy on Render (5 minutes)

1. Go to: https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (click "GitHub" button)
4. Authorize Render to access your GitHub
5. Click "New +" → "Web Service"
6. Find and select "saba-graphics" repository
7. Fill in these settings:

   **Name**: saba-graphics
   **Environment**: Python 3
   **Build Command**: `pip install -r requirements.txt`
   **Start Command**: `python app.py`
   
8. Click "Create Web Service"

---

## ✅ STEP 7: Wait for Deployment

- Render will build and deploy (5-10 minutes)
- Watch the logs screen
- When you see "Deploy successful", you're done!

---

## 🎉 YOUR WEBSITE IS LIVE!

Your website will be at: `https://saba-graphics.onrender.com`

### Share this URL:
- Put it on business cards
- Share on Instagram/Facebook
- Send to clients via WhatsApp
- Update QR code to use this URL

---

## 🆘 Having Issues?

### Git not found?
- Install Git: https://git-scm.com/download/win
- Restart computer

### GitHub password not working?
- Use Personal Access Token instead:
  1. GitHub → Settings → Developer settings → Personal access tokens
  2. Generate new token
  3. Use this instead of password

### Render build failed?
- Check if requirements.txt exists
- Check if app.py has: `app.run(host='0.0.0.0')`

---

## 📞 Need More Help?

Commands are ready to copy-paste! Just follow the steps in order.

**Estimated Total Time**: 15-20 minutes
**Cost**: 100% FREE
