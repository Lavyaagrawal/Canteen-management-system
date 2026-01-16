# 🚂 Railway Backend Deployment - Quick Guide

## Step-by-Step Visual Guide

### Step 1: Sign Up & Login
1. Go to **https://railway.app**
2. Click **"Login"** or **"Start a New Project"**
3. Sign in with your **GitHub account** (click "Login with GitHub")
4. Authorize Railway to access your GitHub repositories

---

### Step 2: Create New Project
1. Click the **"+"** button (or "New Project")
2. Select **"Deploy from GitHub repo"**
3. If prompted, authorize Railway's GitHub app
4. Select your repository from the list
5. Click **"Deploy Now"**

**Note**: Railway will automatically detect your project structure.

---

### Step 3: Configure Your Service

1. **Click on the service** that was just created

2. **Go to Settings tab** (gear icon):
   ```
   Settings → General
   ```
   - **Root Directory**: Type `canteen-backend`
   - **Build Command**: Leave empty (or `npm install` if needed)
   - **Start Command**: `npm start` (verify this matches your package.json)

3. **Go to Variables tab**:
   ```
   Settings → Variables
   ```
   Click **"New Variable"** and add:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = (your database connection string)
   - `JWT_SECRET` = (your secret key)
   - `JWT_REFRESH_SECRET` = (your refresh secret)
   - Add any other environment variables your backend needs

---

### Step 4: Set Up Database (If Needed)

1. In your Railway project, click **"+ New"**
2. Click **"Database"**
3. Select your database type:
   - PostgreSQL (recommended)
   - MySQL
   - MongoDB
   - etc.
4. Railway will automatically create the database
5. Click on the database service
6. Go to **"Variables"** tab
7. Copy the `DATABASE_URL` value
8. Go back to your backend service
9. Paste it as `DATABASE_URL` in your backend's environment variables

---

### Step 5: Generate Public URL

1. Stay in your backend service
2. Go to **Settings → Networking**
3. Click **"Generate Domain"**
4. Your backend URL will appear (e.g., `https://your-app.up.railway.app`)
5. **📋 Copy this URL** - you'll need it!

---

### Step 6: Deploy & Monitor

1. Railway automatically deploys when you:
   - Push to your GitHub repo, OR
   - Make configuration changes

2. **Monitor deployment**:
   - Click on **"Deployments"** tab
   - Watch the build logs
   - Wait for "Deploy Successful" message

3. **Check if service is running**:
   - Look for green status indicator
   - Visit your Railway URL in browser
   - Should see response (or error page if no root route)

---

### Step 7: Update Frontend Configuration

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
4. Save and commit:
   ```bash
   git add vercel.json
   git commit -m "Update backend URL"
   git push
   ```

---

### Step 8: Test Your Deployment

1. Visit your Railway backend URL
2. Test an API endpoint:
   ```
   https://your-app.up.railway.app/api/health
   ```
3. Or test from your frontend application

---

## 🎯 Important Configuration Tips

### Your Server Must:
- ✅ Listen on `process.env.PORT || 3000` (Railway sets PORT automatically)
- ✅ Use environment variables for all secrets
- ✅ Have CORS configured for your frontend domain

### Your package.json Must Have:
```json
{
  "scripts": {
    "start": "node src/server.js"
  }
}
```

### Example Server Setup:
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🐛 Troubleshooting

### ❌ Deployment Fails
- Check the **Deployments** tab for error logs
- Verify `package.json` exists in `canteen-backend` folder
- Check that start command is correct

### ❌ Service Won't Start
- Check **Metrics** tab for crashes
- Review logs in **Deployments** tab
- Verify PORT is set correctly (`process.env.PORT`)

### ❌ Database Connection Fails
- Verify `DATABASE_URL` is set in Variables
- Check database service is running (green status)
- Verify connection string format

### ❌ 503 Service Unavailable
- Check if service is running (should be green)
- Review logs for errors
- Check environment variables are set

---

## 📱 Railway Dashboard Navigation

```
Railway Dashboard
├── Projects
│   └── Your Project
│       ├── Backend Service
│       │   ├── Deployments (view logs)
│       │   ├── Metrics (CPU/Memory)
│       │   └── Settings
│       │       ├── General (Root Directory, Commands)
│       │       ├── Variables (Environment Variables)
│       │       └── Networking (Public URL)
│       └── Database Service (if created)
│           └── Variables (DATABASE_URL)
```

---

## ✅ Success Checklist

- [ ] Backend deployed successfully on Railway
- [ ] Got public Railway URL
- [ ] Updated `vercel.json` with Railway URL
- [ ] Environment variables set correctly
- [ ] Database connected (if using one)
- [ ] API endpoints responding
- [ ] CORS configured for frontend
- [ ] Ready to deploy frontend to Vercel!

---

## 🔗 Quick Links

- **Railway Dashboard**: https://railway.app/dashboard
- **Railway Docs**: https://docs.railway.app
- **Support**: https://discord.gg/railway

---

**Next Step**: Deploy your frontend to Vercel! 🚀