# Vercel Deployment Fix

## Current Issue
Vercel is trying to build from root directory instead of client directory.

## Solution: Configure in Vercel Dashboard

### Step 1: Update Vercel Project Settings

1. Go to your Vercel project dashboard
2. Click **Settings** tab
3. Go to **General** section
4. **Root Directory**: Set to `client` (make sure it's exactly `client`, not `./client` or `/client`)
5. Click **Save**

### Step 2: Configure Build Settings

1. Still in **Settings**
2. Go to **Build & Development Settings**
3. Set the following:
   - **Framework Preset**: `Create React App`
   - **Build Command**: `npm run build` (or leave auto-detect)
   - **Output Directory**: `build`
   - **Install Command**: Leave empty (auto-detect)
4. Click **Save**

### Step 3: Add Environment Variable

1. Go to **Environment Variables**
2. Add new variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your Railway backend URL (e.g., `https://elltysecondtest-production.up.railway.app`)
   - **Environments**: Select all (Production, Preview, Development)
3. Click **Save**

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**

---

## Important Notes

- **Root Directory MUST be set to `client`** - this is the key setting
- The `client/vercel.json` file will be used automatically when Root Directory = client
- Make sure you've committed and pushed `client/vercel.json` to your repository

---

## Verify Configuration

After redeploying, check the build logs:
- Should see: `Installing dependencies...` (installing client dependencies, not root)
- Should see: `> number-discussion-client@0.1.0 build`
- Should NOT see: `> number-discussion-server@1.0.0 build`

If you still see server dependencies being installed, the Root Directory is not set correctly.

