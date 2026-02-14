# 🎯 FINAL STEP - Push to GitHub

Your GitHub username: **sabagraphics4-cpu**

## Run This Command Now:

Open Command Prompt and run:

```bash
cd "c:\Users\pc2\Documents\saba graphics"
git push -u origin main
```

When it asks for credentials:
- **Username**: `sabagraphics4-cpu`
- **Password**: Your GitHub password (or Personal Access Token)

---

## ⚠️ If Password Doesn't Work:

GitHub may require a Personal Access Token instead of password:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Saba Graphics Deploy"
4. Check: `repo` (full control)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## ✅ After Successful Push:

1. Go to: https://render.com
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Select "saba-graphics" repository
5. Settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
6. Click "Create Web Service"

Your site will be live at: **https://saba-graphics.onrender.com**

---

**I've already set up the Git remote for you! Just run the push command above.** 🚀
