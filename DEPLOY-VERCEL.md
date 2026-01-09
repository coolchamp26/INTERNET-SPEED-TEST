# 🚀 Deploy to Vercel (100% FREE)

## ✅ What I've Set Up For You:

I've converted your Express backend to **Vercel Serverless Functions** so you can deploy everything on Vercel for **completely free**!

### Files Created:
- ✅ `vercel.json` - Vercel configuration
- ✅ `api/health.js` - Health check endpoint
- ✅ `api/ping.js` - Ping endpoint for latency test
- ✅ `api/download.js` - Download speed test endpoint
- ✅ `api/upload-raw.js` - Upload speed test endpoint
- ✅ Updated `src/config.js` - Uses relative `/api` path

---

## 🎯 Deploy to Vercel (3 Steps)

### **Step 1: Commit Your Changes**

```bash
git add .
git commit -m "Add Vercel serverless functions"
git push origin main
```

### **Step 2: Deploy on Vercel**

1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Login"** → Sign in with **GitHub**
3. Click **"Add New..."** → **"Project"**
4. Select your `INTERNET-SPEED-TEST` repository
5. Vercel will auto-detect **Vite** ✅
6. Click **"Deploy"** 

That's it! ✨

### **Step 3: Test Your Live App**

After deployment (takes ~2 minutes):
1. Click on your deployment URL (e.g., `https://your-app.vercel.app`)
2. Test the speed test functionality
3. Check browser console (F12) for any errors

---

## 🧪 Testing Locally (Optional)

To test before deploying:

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally with Vercel
vercel dev
```

This will start both your frontend and serverless functions locally.

---

## 🔧 How It Works

**Before:**
- Separate Express server (server/server.js)
- Frontend calls http://localhost:5000/api

**After:**
- Serverless functions in `/api` folder
- Frontend calls `/api` (same domain)
- Everything deploys together on Vercel

---

## ⚡ Benefits

✅ **100% Free** - Unlimited deployments
✅ **Automatic HTTPS** - Free SSL certificate
✅ **Global CDN** - Fast worldwide
✅ **Auto Deployments** - Every git push deploys
✅ **No CORS Issues** - Same domain
✅ **Zero Configuration** - Just push and deploy

---

## 📝 Alternative: GitHub Pages + Render Backend (Also Free)

If you prefer to keep your Express backend:

### **Option A: Frontend on GitHub Pages**

1. Update `vite.config.js`:
```javascript
export default {
  base: '/INTERNET-SPEED-TEST/',
  build: {
    outDir: 'dist'
  }
}
```

2. Add to `package.json` scripts:
```json
"deploy": "npm run build && npx gh-pages -d dist"
```

3. Deploy:
```bash
npm install --save-dev gh-pages
npm run deploy
```

### **Option B: Backend on Render Free Tier**

Render **IS FREE** for 750 hours/month (enough for testing):

1. Go to [render.com](https://render.com)
2. Deploy backend (as shown before)
3. Set environment variable on GitHub Pages:
   - Add `VITE_API_URL=https://your-backend.onrender.com/api`
   - Rebuild and deploy

---

## 🎉 Recommended: Use Vercel

**Vercel is the easiest** - deploys everything in one place with zero configuration.

After pushing your changes, just:
1. Connect GitHub to Vercel
2. Click Deploy
3. Done!

---

## 🐛 Troubleshooting

**If speed test doesn't work:**
1. Open browser console (F12)
2. Check Network tab
3. Verify API calls go to `/api/*` endpoints
4. Check Vercel function logs in dashboard

**Need to rollback?**
- Your original backend is still in `/server` folder
- Just redeploy using old method if needed

---

## ✨ Next Steps

1. Commit and push your changes
2. Deploy to Vercel
3. Share your live URL!

**Questions?** Let me know! 🚀
