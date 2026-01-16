# Vercel Deployment Guide

This guide will help you deploy your Canteen Management System on Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Git repository (GitHub, GitLab, or Bitbucket)
3. Backend API deployed separately (recommended: Railway, Render, or Heroku)

## Deployment Steps

### Step 1: Deploy Backend First

Before deploying the frontend, you need to deploy your backend API separately. Here are recommended platforms:

#### Option A: Railway (Recommended)
1. Go to https://railway.app
2. Sign up with GitHub
3. Create a new project
4. Connect your repository
5. Select the `canteen-backend` folder
6. Set environment variables in Railway dashboard
7. Deploy and copy the backend URL

#### Option B: Render
1. Go to https://render.com
2. Create a new Web Service
3. Connect your repository
4. Set root directory to `canteen-backend`
5. Deploy and copy the backend URL

### Step 2: Update Vercel Configuration

1. Open `vercel.json`
2. Replace `https://your-backend-url.railway.app` with your actual backend URL in the `rewrites` section:

```json
"rewrites": [
  {
    "source": "/api/:path*",
    "destination": "https://YOUR-BACKEND-URL.railway.app/api/:path*"
  }
]
```

### Step 3: Deploy Frontend to Vercel

#### Method 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Navigate to project root:
```bash
cd /Users/lavyaagrawal/Desktop/Canteen-management-system
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Enter a name or press Enter for default)
   - In which directory is your code located? **./frontend** (IMPORTANT)
   - Override settings? **No**

6. For production deployment:
```bash
vercel --prod
```

#### Method 2: Using Vercel Dashboard (Git Integration)

1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: Leave empty (static site)
   - **Output Directory**: Leave empty (all files in frontend)
4. Add Environment Variables (if needed)
5. Click **Deploy**

### Step 4: Configure Environment Variables

If your frontend needs environment variables, add them in Vercel:

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add variables if needed (e.g., `VITE_API_URL` if using Vite)

### Step 5: Update API Endpoints (Optional)

If you want to use environment variables for the backend URL instead of rewrites:

1. Create a config file in frontend: `frontend/assets/js/config.js`
2. Use environment variables or update API calls

## Post-Deployment

1. Visit your deployed site (you'll get a URL like `https://your-project.vercel.app`)
2. Test all API endpoints to ensure they're working
3. Update CORS settings on your backend to allow requests from your Vercel domain

## Troubleshooting

### API calls not working
- Check that your backend URL in `vercel.json` is correct
- Verify backend is deployed and accessible
- Check CORS settings on backend

### 404 errors on page refresh
- Vercel handles this automatically with rewrites
- If issues persist, check the routing configuration

### Static assets not loading
- Ensure all paths are relative (starting with `./` or `/`)
- Check that assets are in the `frontend` directory

## Continuous Deployment

Once connected to Git:
- Every push to `main` branch will auto-deploy to production
- Other branches will create preview deployments

## Custom Domain

1. Go to project settings in Vercel
2. Navigate to **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## Notes

- Vercel has a free tier with generous limits
- Static sites are served from CDN for fast performance
- Backend should be deployed separately as Vercel is optimized for frontend/serverless