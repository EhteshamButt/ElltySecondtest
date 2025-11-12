# Deployment Guide

This guide covers deploying the Number Discussion App to various platforms.

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)
Railway can deploy both frontend and backend together.

### Option 2: Render (Free Tier Available)
Similar to Railway, good for full-stack apps.

### Option 3: Vercel (Frontend) + Railway/Render (Backend)
Separate deployments for frontend and backend.

---

## 🚂 Railway Deployment (Recommended)

### Steps:

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to Railway.app** and sign up/login

3. **Create New Project** → "Deploy from GitHub repo"

4. **Select your repository**

5. **Add Environment Variables:**
   - `DATABASE_URL` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret
   - `ACCESS_TOKEN_SECRET` - Your access token secret
   - `REFRESH_TOKEN_SECRET` - Your refresh token secret
   - `NODE_ENV=production`
   - `PORT` - Railway will provide this automatically

6. **Configure Build Settings:**
   - Root Directory: `/server`
   - Build Command: `npm install && npm run build && npm run prisma:generate`
   - Start Command: `npm start`

7. **For Frontend (Separate Service):**
   - Add another service from the same repo
   - Root Directory: `/client`
   - Build Command: `npm install && npm run build`
   - Output Directory: `build`
   - Add environment variable: `REACT_APP_API_URL=https://your-backend-url.railway.app`

8. **Update CORS in server** to allow your frontend domain

---

## 🎨 Render Deployment

### Backend on Render:

1. **Push code to GitHub**

2. **Go to render.com** and create account

3. **New → Web Service**

4. **Connect your GitHub repo**

5. **Configure:**
   - Name: `number-discussion-api`
   - Environment: `Node`
   - Build Command: `cd server && npm install && npm run build && npm run prisma:generate`
   - Start Command: `cd server && npm start`
   - Root Directory: `server`

6. **Add Environment Variables:**
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`
   - `NODE_ENV=production`
   - `PORT=10000` (Render uses port 10000)

### Frontend on Render:

1. **New → Static Site**

2. **Connect GitHub repo**

3. **Configure:**
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/build`
   - Root Directory: `client`

4. **Add Environment Variable:**
   - `REACT_APP_API_URL=https://your-backend-url.onrender.com`

---

## ▲ Vercel Deployment (Frontend) + Railway/Render (Backend)

### Frontend on Vercel:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd client
   vercel
   ```

3. **Or use GitHub integration:**
   - Push to GitHub
   - Go to vercel.com
   - Import project
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Add Environment Variable:**
   - `REACT_APP_API_URL=https://your-backend-url`

### Backend on Railway/Render:
Follow the backend deployment steps above.

---

## 🔧 Required Configuration Changes

### 1. Update CORS in Server

The server needs to allow requests from your frontend domain. Update `server/src/index.ts`:

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### 2. Update Frontend API URL

In `client/src/context/AuthContext.tsx` and API calls, use:
```typescript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
axios.defaults.baseURL = API_URL;
```

### 3. Environment Variables Checklist

**Backend:**
- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET`
- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`
- `NODE_ENV=production`
- `PORT` (usually auto-provided)
- `FRONTEND_URL` - Your frontend URL for CORS

**Frontend:**
- `REACT_APP_API_URL` - Your backend API URL

---

## 📝 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas database is accessible (check IP whitelist - add `0.0.0.0/0` for all IPs)
- [ ] Environment variables prepared
- [ ] CORS configured for production domain
- [ ] Frontend API URL configured
- [ ] Build commands tested locally

---

## 🔍 Testing After Deployment

1. **Test Backend:**
   - Visit: `https://your-backend-url/api/health`
   - Should return: `{"status":"ok"}`

2. **Test Frontend:**
   - Visit your frontend URL
   - Try registering a new user
   - Create a discussion
   - Add operations

---

## 🆘 Troubleshooting

**Backend won't start:**
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check build logs for errors

**Frontend can't connect to backend:**
- Verify `REACT_APP_API_URL` is set correctly
- Check CORS settings in backend
- Verify backend is running and accessible

**Database connection errors:**
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0`)
- Verify connection string format
- Check database user permissions

---

## 💰 Cost Comparison

- **Railway**: Free tier with $5 credit/month, then pay-as-you-go
- **Render**: Free tier available, slower cold starts
- **Vercel**: Free tier for frontend, generous limits
- **MongoDB Atlas**: Free tier (M0) available

---

## 🎯 Recommended Setup

For this project, I recommend:
- **Backend**: Railway or Render
- **Frontend**: Vercel (fastest) or Render Static Site
- **Database**: MongoDB Atlas (already set up)

This gives you a free tier setup that's production-ready!

