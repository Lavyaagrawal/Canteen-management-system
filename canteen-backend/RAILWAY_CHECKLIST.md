# Railway Deployment Checklist

Use this checklist to ensure your backend is ready for Railway deployment.

## Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] Backend code is in `canteen-backend` folder
- [ ] `package.json` exists in `canteen-backend` folder
- [ ] `package.json` has a `start` script (e.g., `"start": "node src/server.js"`)
- [ ] Server listens on `process.env.PORT || 3000` (Railway sets PORT automatically)
- [ ] All dependencies are listed in `package.json`
- [ ] No hardcoded database URLs or secrets in code
- [ ] CORS is configured to allow frontend domain

### ✅ Package.json Requirements
Your `package.json` should look something like this:

```json
{
  "name": "canteen-backend",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    // ... other dependencies
  }
}
```

### ✅ Environment Variables Needed
Prepare these environment variables:

- [ ] `PORT` (Railway sets this automatically, but you can override)
- [ ] `NODE_ENV=production`
- [ ] `DATABASE_URL` (if using database)
- [ ] `JWT_SECRET`
- [ ] `JWT_REFRESH_SECRET`
- [ ] Any other secrets/configs your app needs

### ✅ Server Configuration
- [ ] Server uses `process.env.PORT` instead of hardcoded port
- [ ] Database connection uses `process.env.DATABASE_URL`
- [ ] Error handling is in place
- [ ] Logging is configured

## Railway Deployment Steps

### Step 1: GitHub Setup
- [ ] Repository is on GitHub
- [ ] Code is pushed to main/master branch
- [ ] Railway can access your repository

### Step 2: Railway Project Setup
- [ ] Created Railway account
- [ ] Connected GitHub account
- [ ] Created new project
- [ ] Selected your repository

### Step 3: Service Configuration
- [ ] Set Root Directory to `canteen-backend`
- [ ] Set Start Command (usually `npm start`)
- [ ] Generated public domain
- [ ] Copied the Railway URL

### Step 4: Environment Variables
- [ ] Added `DATABASE_URL` (if using Railway database)
- [ ] Added `JWT_SECRET` and `JWT_REFRESH_SECRET`
- [ ] Added all other required variables
- [ ] Verified all variables are set correctly

### Step 5: Database Setup (if needed)
- [ ] Created database service in Railway
- [ ] Copied database connection string
- [ ] Added `DATABASE_URL` to environment variables
- [ ] Ran migrations (if needed)

### Step 6: Deployment
- [ ] Deployment completed successfully
- [ ] Checked deployment logs for errors
- [ ] Service is running (green status)
- [ ] Tested backend URL in browser

### Step 7: Frontend Integration
- [ ] Updated `vercel.json` with Railway backend URL
- [ ] Configured CORS to allow Vercel domain
- [ ] Tested API endpoints from frontend

## Post-Deployment Testing

### ✅ Functionality Tests
- [ ] Health check endpoint works
- [ ] API endpoints respond correctly
- [ ] Database connections work
- [ ] Authentication endpoints work
- [ ] Error handling works

### ✅ Integration Tests
- [ ] Frontend can connect to backend
- [ ] CORS is working correctly
- [ ] API calls from frontend succeed
- [ ] Authentication flow works end-to-end

## Common Issues & Solutions

### Issue: Deployment fails
**Solution**: Check build logs, verify package.json exists, check start command

### Issue: Service won't start
**Solution**: Check PORT environment variable, verify start command, check logs

### Issue: Database connection fails
**Solution**: Verify DATABASE_URL is set correctly, check database service is running

### Issue: CORS errors from frontend
**Solution**: Update CORS configuration to include Vercel domain

### Issue: Environment variables not working
**Solution**: Verify variables are set in Railway dashboard, restart service

## Quick Reference

- **Railway Dashboard**: https://railway.app/dashboard
- **Railway Docs**: https://docs.railway.app
- **Get your backend URL**: Settings → Networking → Generate Domain
- **View Logs**: Click on service → Deployments → View logs
- **Environment Variables**: Settings → Variables tab

## Next Steps After Deployment

1. ✅ Backend deployed successfully
2. ⬜ Update frontend configuration with backend URL
3. ⬜ Deploy frontend to Vercel
4. ⬜ Test full application
5. ⬜ Set up custom domain (optional)
6. ⬜ Configure monitoring (optional)