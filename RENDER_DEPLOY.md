# 🚀 RENDER DEPLOYMENT - FOLLOW THESE STEPS

Your Git repository is ready! Now follow these steps to deploy on Render.com

---

## ✅ STEP 1: Create GitHub Account (if you don't have one)

1. Go to: **https://github.com**
2. Click "Sign Up"
3. Use email: **saba.graphics4@gmail.com**
4. Create password and complete signup

---

## ✅ STEP 2: Create New GitHub Repository

1. After logging in, click the **"+"** icon (top right)
2. Click **"New repository"**
3. Fill in:
   - Repository name: `saba-graphics`
   - Description: "Professional design services website"
   - Make it **Public**
   - **DO NOT** check "Initialize with README"
4. Click **"Create repository"**

---

## ✅ STEP 3: Push Your Code to GitHub

GitHub will show you commands. **Copy these exact commands** and run in Command Prompt:

```bash
cd "c:\Users\pc2\Documents\saba graphics"
git remote add origin https://github.com/YOUR_USERNAME/saba-graphics.git
git branch -M main
git push -u origin main
```

**IMPORTANT**: Replace `YOUR_USERNAME` with your actual GitHub username!

When it asks for credentials:
- Username: (your GitHub username)
- Password: (your GitHub password or token)

---

## ✅ STEP 4: Deploy on Render

1. Go to: **https://render.com**
2. Click **"Get Started for Free"**
3. Click **"Sign In with GitHub"** (easier!)
4. Authorize Render to access your GitHub repositories
5. Once logged in, click **"New +"** button (top right)
6. Select **"Web Service"**
7. Find your **"saba-graphics"** repository and click **"Connect"**

---

## ✅ STEP 5: Configure Render Settings

Fill in these settings:

- **Name**: `saba-graphics` (or any name you like)
- **Region**: Choose closest to you (e.g., Singapore for India)
- **Branch**: `main`
- **Runtime**: `Python 3`
- **Build Command**: `./build.sh`
- **Start Command**: `python app.py`
- **Instance Type**: `Free`

Click **"Create Web Service"**

---

## ✅ STEP 6: Wait for Deployment

- Render will start building (5-10 minutes)
- You'll see logs on screen
- Wait for **"Deploy successful"** message
- Your site status will turn green

---

## 🎉 YOUR WEBSITE IS LIVE!

Your website will be at: **https://saba-graphics.onrender.com**

(The exact URL will be shown in Render dashboard)

---

## 📱 Update Your QR Code

After deployment, update the QR code URL in your code:

1. Open: `static/js/main.js`
2. Find line with: `const networkUrl = "http://192.168.1.15:5000";`
3. Change to: `const networkUrl = "https://saba-graphics.onrender.com";`
4. Commit and push:
   ```bash
   git add .
   git commit -m "Update QR code URL"
   git push
   ```
5. Render will auto-deploy the update!

---

## 🔄 Future Updates

Whenever you make changes:

```bash
git add .
git commit -m "describe your changes"
git push
```

Render automatically redeploys! 🚀

---

## 🆘 Common Issues

**Git push asks for password repeatedly?**
- Use GitHub Personal Access Token
- Go to: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Use this token as password

**Render build failed?**
- Check build logs in Render dashboard
- Ensure `requirements.txt` exists
- Ensure `app.py` has correct settings

---

**Total Time**: 15-20 minutes
**Cost**: 100% FREE forever
