# 🎉 Deployment Successful! Next Steps

## ✅ Backend Deployed on Railway

Your backend is now live! Here's what to do next:

## Step 1: Get Your Railway Backend URL

1. Go to your Railway dashboard
2. Click on your service
3. Go to **Settings** → **Networking**
4. Click **"Generate Domain"** (if not already generated)
5. **Copy your backend URL** (e.g., `https://your-app.up.railway.app`)

## Step 2: Update Frontend Configuration

Update `vercel.json` with your Railway backend URL:

1. Open `vercel.json` in your project root
2. Find this section:
   ```json
   "rewrites": [
     {
       "source": "/api/:path*",
       "destination": "https://your-backend-url.railway.app/api/:path*"
     }
   ]
   ```
3. Replace `your-backend-url.railway.app` with your actual Railway URL
4. Save the file

## Step 3: Commit and Push the Update

```bash
git add vercel.json
git commit -m "Update backend URL for Railway deployment"
git push origin main
```

## Step 4: Deploy Frontend to Vercel

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Navigate to project root
cd /Users/lavyaagrawal/Desktop/Canteen-management-system

# Login to Vercel
vercel login

# Deploy
vercel

# When prompted:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? (Enter a name or press Enter)
# - In which directory is your code located? ./frontend
# - Override settings? No

# Deploy to production
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Other
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
4. Add Environment Variables (if needed)
5. Click **Deploy**

## Step 5: Configure CORS on Backend

Make sure your backend allows requests from your Vercel domain:

1. Update your backend CORS configuration to include:
   ```javascript
   origin: [
     'https://your-frontend.vercel.app',
     'http://localhost:5501', // For local development
   ]
   ```

2. Redeploy backend if needed

## Step 6: Test Your Application

1. Visit your Vercel frontend URL
2. Test the following:
   - ✅ Homepage loads
   - ✅ Login/Signup forms work
   - ✅ API calls succeed
   - ✅ Authentication works
   - ✅ All features function correctly

## Step 7: Set Up Environment Variables (If Needed)

### Backend (Railway):
- `DATABASE_URL` (if using database)
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `NODE_ENV=production`
- Any other backend secrets

### Frontend (Vercel):
- Usually not needed if using API rewrites
- Add if you have frontend-specific env vars

## 🎯 Checklist

- [x] Backend deployed on Railway ✅
- [ ] Got Railway backend URL
- [ ] Updated vercel.json with backend URL
- [ ] Committed and pushed vercel.json
- [ ] Deployed frontend to Vercel
- [ ] Configured CORS on backend
- [ ] Tested full application
- [ ] Everything working! 🎉

## 🔗 Quick Links

- **Railway Dashboard**: https://railway.app/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Railway Backend**: (Get from Railway dashboard)
- **Your Vercel Frontend**: (Will be provided after deployment)

## 🆘 Troubleshooting

### Frontend can't connect to backend
- Check vercel.json has correct Railway URL
- Verify CORS is configured on backend
- Check browser console for errors

### API calls failing
- Verify Railway backend is running (green status)
- Check Railway logs for errors
- Test backend URL directly in browser

### CORS errors
- Update backend CORS to include Vercel domain
- Redeploy backend after CORS changes

---

**Congratulations! Your backend is live! 🚀**

Now let's get your frontend deployed!