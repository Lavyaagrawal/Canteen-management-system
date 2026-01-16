# Deploy Backend to Railway - Step by Step Guide

This guide will walk you through deploying your Canteen Management System backend to Railway.

## Prerequisites

1. **GitHub Account** - Railway uses GitHub for deployments
2. **Railway Account** - Sign up at https://railway.app
3. **Your backend code** should be in the `canteen-backend` folder

## Step 1: Prepare Your Backend

### 1.1 Ensure package.json exists

Make sure you have a `package.json` in your `canteen-backend` folder. If not, create one based on your dependencies.

### 1.2 Check your server entry point

Railway needs to know how to start your server. Make sure:
- Your `package.json` has a `start` script
- The entry point (likely `src/server.js`) is configured correctly

### 1.3 Prepare environment variables list

Note down all environment variables your backend needs (database URL, JWT secrets, etc.)

## Step 2: Push Code to GitHub

1. **Initialize Git** (if not already done):
```bash
cd /Users/lavyaagrawal/Desktop/Canteen-management-system
git init
git add .
git commit -m "Initial commit"
```

2. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository
   - Don't initialize with README (if you already have code)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Railway

### 3.1 Sign Up / Login

1. Go to https://railway.app
2. Click **"Login"** or **"Start a New Project"**
3. Sign in with your **GitHub account**

### 3.2 Create New Project

1. Click **"New Project"** (or the **"+"** button)
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub if prompted
4. Select your repository from the list
5. Click **"Deploy Now"**

### 3.3 Configure Deployment Settings

Railway will detect your project automatically, but you need to configure it:

1. **Click on your newly created service**

2. **Go to Settings tab**:
   - **Root Directory**: Set to `canteen-backend`
   - **Build Command**: Leave empty or set to `npm install` if needed
   - **Start Command**: Should be `npm start` (verify this matches your package.json)

3. **Set up Environment Variables**:
   - Click on **"Variables"** tab
   - Add all required environment variables:
     ```
     PORT=3000 (Railway will set this automatically, but you can override)
     NODE_ENV=production
     DATABASE_URL=your_database_connection_string
     JWT_SECRET=your_jwt_secret
     JWT_REFRESH_SECRET=your_refresh_secret
     EMAIL_HOST=your_email_host (if using email)
     EMAIL_PORT=your_email_port
     EMAIL_USER=your_email_user
     EMAIL_PASS=your_email_password
     ```
   - Add any other variables your backend needs

### 3.4 Set up Database (if needed)

If you're using a database:

**Option A: Use Railway's Database**
1. In your Railway project, click **"+ New"**
2. Select **"Database"** → Choose your database type (PostgreSQL, MySQL, MongoDB, etc.)
3. Railway will automatically provision a database
4. Copy the connection string from the database service
5. Add it as `DATABASE_URL` in your service's environment variables

**Option B: Use External Database**
- Add your external database connection string to environment variables

### 3.5 Deploy

1. Railway will automatically deploy when you:
   - Push changes to your GitHub repository, OR
   - Click **"Redeploy"** in the Railway dashboard

2. **Monitor the deployment**:
   - Go to the **"Deployments"** tab to see build logs
   - Wait for deployment to complete (usually 2-5 minutes)

### 3.6 Get Your Backend URL

1. Once deployed, go to the **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"** to get a public URL
4. Your backend URL will look like: `https://your-app-name.up.railway.app`
5. **Copy this URL** - you'll need it for frontend configuration

## Step 4: Update Frontend Configuration

1. Open `vercel.json` in your project root
2. Update the backend URL in the rewrites section:
   ```json
   "rewrites": [
     {
       "source": "/api/:path*",
       "destination": "https://your-app-name.up.railway.app/api/:path*"
     }
   ]
   ```

3. Commit and push:
   ```bash
   git add vercel.json
   git commit -m "Update backend URL for Railway"
   git push
   ```

## Step 5: Configure CORS

Make sure your backend allows requests from your Vercel frontend domain:

1. In your backend code, update CORS settings to include:
   ```javascript
   // Allow your Vercel domain
   origin: [
     'https://your-frontend.vercel.app',
     'http://localhost:5501', // For local development
   ]
   ```

## Step 6: Test Your Deployment

1. Visit your Railway backend URL: `https://your-app-name.up.railway.app`
2. Test API endpoints:
   - Health check: `https://your-app-name.up.railway.app/api/health`
   - Test endpoint from your frontend

## Troubleshooting

### Deployment Fails

1. **Check Build Logs**:
   - Go to **"Deployments"** tab
   - Click on failed deployment
   - Review error messages

2. **Common Issues**:
   - **Missing package.json**: Create one in `canteen-backend` folder
   - **Wrong start command**: Check your package.json scripts
   - **Missing dependencies**: Ensure all packages are in package.json
   - **Environment variables**: Make sure all required vars are set

### 503 Errors / Service Unavailable

1. **Check if service is running**:
   - Go to **"Metrics"** tab
   - Check CPU/Memory usage
   - Look for crashes in logs

2. **Check PORT**:
   - Railway sets `PORT` environment variable automatically
   - Make sure your server listens on `process.env.PORT || 3000`

### Database Connection Issues

1. **Check DATABASE_URL**:
   - Ensure it's set correctly in environment variables
   - Verify the database service is running

2. **Connection String Format**:
   - PostgreSQL: `postgresql://user:password@host:port/database`
   - MongoDB: `mongodb://user:password@host:port/database`

### API Not Working

1. **Check CORS settings**:
   - Verify frontend domain is allowed
   - Check browser console for CORS errors

2. **Verify API routes**:
   - Test endpoints directly in browser/Postman
   - Check Railway logs for errors

## Railway Pricing

- **Free Tier**: $5 credit per month
- **Hobby Plan**: Pay-as-you-go
- Check current pricing at https://railway.app/pricing

## Useful Railway Features

1. **Automatic HTTPS**: Railway provides SSL certificates automatically
2. **Custom Domains**: You can add your own domain in settings
3. **Logs**: Real-time logs available in dashboard
4. **Metrics**: Monitor CPU, Memory, and Network usage
5. **Environment Variables**: Secure storage for secrets
6. **Rollbacks**: Easy rollback to previous deployments

## Next Steps

1. ✅ Backend deployed on Railway
2. ✅ Frontend deployed on Vercel
3. ✅ API endpoints working
4. 🔄 Set up custom domain (optional)
5. 🔄 Configure monitoring (optional)
6. 🔄 Set up CI/CD (automatic deployments on git push)

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app