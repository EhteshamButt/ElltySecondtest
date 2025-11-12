# Deploy Your App Now 🚀

Your repository: https://github.com/EhteshamButt/ElltySecondtest

## Quick Deployment Steps

### Option 1: Railway (Backend) + Vercel (Frontend) - Recommended

#### Step 1: Deploy Backend on Railway

1. **Go to [railway.app](https://railway.app)** and sign up/login with GitHub

2. **Click "New Project"** → **"Deploy from GitHub repo"**

3. **Select your repository**: `EhteshamButt/ElltySecondtest`

4. **Configure the service:**
   - Click on the service → **Settings**
   - **Root Directory**: Set to `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. **Add Environment Variables** (in Railway → Variables tab):
   ```
   DATABASE_URL=mongodb+srv://ehteshambutt58:4G9PFxLyIR6PqGLn@cluster0.mw68zmh.mongodb.net/number_discussion?retryWrites=true&w=majority
   JWT_SECRET=015047b52f5762247662f70ad1247977978691975e028b8d4b48e12c663aeb07c8bd1c068453c67d7015a8adedb2db7f926d8fd385d104d6cd5db8fb6b737831
   ACCESS_TOKEN_SECRET=015047b52f5762247662f70ad1247977978691975e028b8d4b48e12c663aeb07c8bd1c068453c67d7015a8adedb2db7f926d8fd385d104d6cd5db8fb6b737831
   REFRESH_TOKEN_SECRET=a1c174688653d454321b141527bb6143fc5520f788610b46174674b7777f4e2fb4a538de3c8d094f263c1798635d64affd016ffb74cee0b3c11e5d0540bc78e9
   NODE_ENV=production
   ```

6. **Get your backend URL**: Railway will give you a URL like `https://your-app.railway.app`
   - Copy this URL - you'll need it for the frontend!

7. **Test backend**: Visit `https://your-backend-url.railway.app/api/health`
   - Should return: `{"status":"ok"}`

---

#### Step 2: Deploy Frontend on Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign up/login with GitHub

2. **Click "Add New Project"**

3. **Import your repository**: `EhteshamButt/ElltySecondtest`

4. **Configure Project Settings:**
   - **Framework Preset**: `Create React App`
   - **Root Directory**: Click "Edit" → Set to `client`
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `build` (should auto-detect)

5. **Add Environment Variable:**
   - Click "Environment Variables"
   - Add new variable:
     - **Name**: `REACT_APP_API_URL`
     - **Value**: `https://your-backend-url.railway.app` (from Step 1)
   - Make sure it's set for **Production**, **Preview**, and **Development**

6. **Click "Deploy"**

7. **Get your frontend URL**: Vercel will give you a URL like `https://your-app.vercel.app`

---

#### Step 3: Update Backend CORS

1. **Go back to Railway** (your backend)

2. **Add one more environment variable:**
   - **Name**: `FRONTEND_URL`
   - **Value**: `https://your-frontend-url.vercel.app` (from Step 2)

3. Railway will automatically redeploy with the new CORS settings

---

#### Step 4: Update MongoDB Atlas (IMPORTANT!)

1. **Go to [MongoDB Atlas](https://cloud.mongodb.com)**

2. **Click "Network Access"** in the left sidebar

3. **Click "Add IP Address"**

4. **Click "Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - This allows Railway to connect to your database

5. **Click "Confirm"**

---

### ✅ Done! Your app is live!

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`

---

## Option 2: Both on Render (Free Tier)

### Backend on Render:

1. **Go to [render.com](https://render.com)** and sign up with GitHub

2. **Click "New +"** → **"Web Service"**

3. **Connect your repository**: `EhteshamButt/ElltySecondtest`

4. **Configure:**
   - **Name**: `number-discussion-api`
   - **Environment**: `Node`
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. **Add Environment Variables:**
   - Same as Railway (DATABASE_URL, JWT_SECRET, etc.)
   - Add: `PORT=10000` (Render uses port 10000)

6. **Click "Create Web Service"**

7. **Get URL**: `https://your-app.onrender.com`

### Frontend on Render:

1. **Click "New +"** → **"Static Site"**

2. **Connect repository**: `EhteshamButt/ElltySecondtest`

3. **Configure:**
   - **Name**: `number-discussion-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

4. **Add Environment Variable:**
   - `REACT_APP_API_URL` = your backend URL

5. **Click "Create Static Site"**

6. **Update backend CORS** with frontend URL

---

## Troubleshooting

### Backend won't start:
- ✅ Check all environment variables are set
- ✅ Verify MongoDB connection string is correct
- ✅ Check Railway/Render logs for errors

### Frontend can't connect to backend:
- ✅ Verify `REACT_APP_API_URL` is set correctly
- ✅ Check backend CORS has frontend URL
- ✅ Make sure backend is running (test `/api/health`)

### Database connection errors:
- ✅ MongoDB Atlas IP whitelist must include `0.0.0.0/0`
- ✅ Check connection string format
- ✅ Verify database user has correct permissions

### Build fails:
- ✅ Check that Root Directory is set correctly (`server` or `client`)
- ✅ Verify all dependencies are in package.json
- ✅ Check build logs for specific errors

---

## Testing Your Deployment

1. **Visit your frontend URL**
2. **Try registering** a new user
3. **Create a discussion** with a starting number
4. **Add operations** to test the tree structure

---

## Quick Links

- **Your Repository**: https://github.com/EhteshamButt/ElltySecondtest
- **Railway**: https://railway.app
- **Vercel**: https://vercel.com
- **Render**: https://render.com
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## Cost

- **Railway**: Free $5 credit/month, then pay-as-you-go (~$5-10/month)
- **Vercel**: Free tier (generous limits)
- **Render**: Free tier (slower cold starts)
- **MongoDB Atlas**: Free tier (M0 cluster)

**Total cost**: $0/month on free tiers! 🎉

