# Railway Build Failure - Troubleshooting Guide

## Current Status
✅ `package.json` exists and is committed to repository  
✅ `railway.json` configuration file exists  
❌ Railway build is still failing

## Step 1: Verify Railway Configuration

Go to your Railway dashboard and check these settings:

### 1. Root Directory
1. Click on your service
2. Go to **Settings** → **General**
3. Check **Root Directory** field
4. **MUST be set to:** `canteen-backend`
5. If it's empty or wrong, update it and save

### 2. Start Command
1. In the same **Settings** → **General** section
2. Check **Start Command**
3. **Should be:** `npm start`
4. If different, update it

### 3. Build Command
1. Check **Build Command**
2. Should be empty OR `npm install`
3. Railway will auto-detect and run `npm install` if package.json exists

## Step 2: Check Build Logs

1. Go to **Deployments** tab
2. Click on the failed deployment
3. Click **"Build Logs"** tab
4. Look for specific error messages

### Common Build Errors:

#### Error: "Cannot find package.json"
**Solution:** Root Directory is not set to `canteen-backend`

#### Error: "Module not found" or "Cannot find module"
**Solution:** Dependencies missing - check if all packages in package.json are correct

#### Error: "Cannot find file src/server.js"
**Solution:** Entry point file doesn't exist or path is wrong

#### Error: "Port already in use" or "EADDRINUSE"
**Solution:** Server not using `process.env.PORT`

## Step 3: Verify Your Server File

Make sure `src/server.js` exists and:
- Uses `process.env.PORT || 3000` for the port
- Properly exports/starts the Express app

Example:
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Step 4: Manual Redeploy

After fixing configuration:
1. Go to **Deployments** tab
2. Click **"Redeploy"** button
3. Or push a new commit to trigger redeploy

## Step 5: Check Railway Service Settings

1. **Settings** → **General**:
   - ✅ Root Directory: `canteen-backend`
   - ✅ Start Command: `npm start`
   - ✅ Build Command: (empty or `npm install`)

2. **Settings** → **Variables**:
   - Add required environment variables:
     - `NODE_ENV=production`
     - `PORT` (Railway sets this automatically)
     - `DATABASE_URL` (if using database)
     - `JWT_SECRET`
     - `JWT_REFRESH_SECRET`
     - Any other variables your app needs

## Quick Fix Checklist

- [ ] Root Directory set to `canteen-backend` in Railway
- [ ] Start Command is `npm start`
- [ ] package.json exists in `canteen-backend` folder
- [ ] src/server.js exists and is correct
- [ ] Server uses `process.env.PORT`
- [ ] All environment variables are set
- [ ] Checked build logs for specific errors

## Still Not Working?

1. **Share the Build Logs**: Copy the error from Railway's Build Logs tab
2. **Verify file structure**: Make sure all files are in the right place
3. **Test locally**: Try running `npm install` and `npm start` locally to see if it works

## Next Steps

Once build succeeds:
1. ✅ Build successful
2. ⬜ Service starts successfully  
3. ⬜ Generate public domain
4. ⬜ Test API endpoints
5. ⬜ Update frontend with backend URL