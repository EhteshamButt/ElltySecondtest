# Quick Deployment Guide

## 🚀 Fastest Way: Railway (5 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy Backend on Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect it's a Node.js app
5. **Set Root Directory**: `server`
6. **Add Environment Variables**:
   ```
   DATABASE_URL=mongodb+srv://ehteshambutt58:4G9PFxLyIR6PqGLn@cluster0.mw68zmh.mongodb.net/number_discussion?retryWrites=true&w=majority
   JWT_SECRET=015047b52f5762247662f70ad1247977978691975e028b8d4b48e12c663aeb07c8bd1c068453c67d7015a8adedb2db7f926d8fd385d104d6cd5db8fb6b737831
   ACCESS_TOKEN_SECRET=015047b52f5762247662f70ad1247977978691975e028b8d4b48e12c663aeb07c8bd1c068453c67d7015a8adedb2db7f926d8fd385d104d6cd5db8fb6b737831
   REFRESH_TOKEN_SECRET=a1c174688653d454321b141527bb6143fc5520f788610b46174674b7777f4e2fb4a538de3c8d094f263c1798635d64affd016ffb74cee0b3c11e5d0540bc78e9
   NODE_ENV=production
   ```
7. Railway will auto-generate a URL like: `https://your-app.railway.app`
8. **Copy this URL** - you'll need it for the frontend

### Step 3: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New Project"
3. Import your GitHub repository
4. **Configure**:
   - Framework Preset: `Create React App`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
5. **Add Environment Variable**:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-app.railway.app` (the backend URL from Step 2)
6. Click "Deploy"

### Step 4: Update Backend CORS

1. Go back to Railway
2. Add environment variable:
   - Key: `FRONTEND_URL`
   - Value: `https://your-frontend.vercel.app` (your Vercel frontend URL)
3. Railway will automatically redeploy

### Step 5: Update MongoDB Atlas IP Whitelist

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Network Access → Add IP Address
3. Click "Allow Access from Anywhere" (adds `0.0.0.0/0`)
4. This allows Railway to connect to your database

### ✅ Done!

Your app is now live at:
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-app.railway.app`

---

## 🎯 Alternative: All on Render (Free Tier)

### Backend:
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Settings:
   - Root Directory: `server`
   - Build: `npm install && npm run build && npm run prisma:generate`
   - Start: `npm start`
5. Add environment variables (same as Railway)
6. Get URL: `https://your-app.onrender.com`

### Frontend:
1. New → Static Site
2. Connect GitHub repo
3. Settings:
   - Root Directory: `client`
   - Build: `npm install && npm run build`
   - Publish: `build`
4. Add `REACT_APP_API_URL` environment variable
5. Get URL: `https://your-app.onrender.com`

---

## 📝 Important Notes

1. **MongoDB Atlas**: Make sure to whitelist `0.0.0.0/0` in Network Access
2. **CORS**: Backend needs `FRONTEND_URL` environment variable
3. **API URL**: Frontend needs `REACT_APP_API_URL` environment variable
4. **Build Time**: First build may take 5-10 minutes

---

## 🔍 Test Your Deployment

1. Visit your frontend URL
2. Try registering a new user
3. Create a discussion
4. Add operations

If something doesn't work:
- Check backend logs in Railway/Render
- Verify environment variables are set
- Check MongoDB Atlas connection

