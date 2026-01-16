# Quick Start: Deploy to Vercel

## 🚀 Quick Deployment Steps

### 1. Deploy Backend (Choose one platform)

**Option A: Railway (Easiest)**
- Go to https://railway.app
- Sign up with GitHub
- New Project → Deploy from GitHub repo
- Select `canteen-backend` folder
- Set environment variables
- Copy the deployed URL

**Option B: Render**
- Go to https://render.com  
- New Web Service → Connect repo
- Root Directory: `canteen-backend`
- Copy deployed URL

### 2. Update Backend URL in vercel.json

Edit `vercel.json` and replace:
```json
"destination": "https://your-backend-url.railway.app/api/:path*"
```
with your actual backend URL.

### 3. Deploy Frontend to Vercel

**Via CLI:**
```bash
npm i -g vercel
cd /Users/lavyaagrawal/Desktop/Canteen-management-system
vercel login
vercel
# When asked for directory, enter: ./frontend
vercel --prod
```

**Via Dashboard:**
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Root Directory: `frontend`
4. Framework: Other
5. Deploy

### 4. Configure CORS on Backend

Allow your Vercel domain in backend CORS settings:
```
https://your-project.vercel.app
```

### 5. Test Your Deployment

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Login/Signup forms work
- ✅ API calls succeed

## 📝 Important Notes

- Backend and frontend are deployed separately
- Frontend on Vercel, Backend on Railway/Render
- API rewrites in vercel.json handle /api/* requests
- Update backend URL in vercel.json before deploying

## 🆘 Need Help?

See `DEPLOYMENT.md` for detailed instructions.