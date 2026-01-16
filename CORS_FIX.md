# Fix CORS Configuration for Backend

## Problem
OTP requests are failing because the backend doesn't allow requests from your Vercel frontend domain.

## Solution: Update Backend CORS Configuration

Your backend needs to allow requests from:
- **Vercel Frontend**: `https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app`
- **Local Development**: `http://localhost:5501`

## Step 1: Update Backend CORS Configuration

Open your backend file (likely `canteen-backend/src/app.js` or `canteen-backend/src/server.js`) and add/update CORS configuration:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// CORS Configuration
const allowedOrigins = [
  'https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app',
  'http://localhost:5501',
  'http://localhost:3000',
  'http://127.0.0.1:5501'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rest of your app configuration...
```

## Alternative: Allow All Origins (For Testing Only)

⚠️ **Only use this for testing. Not recommended for production.**

```javascript
app.use(cors({
  origin: '*', // Allow all origins
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Step 2: Commit and Push Changes

```bash
cd /Users/lavyaagrawal/Desktop/Canteen-management-system
git add canteen-backend/src/app.js  # or server.js, whichever has CORS
git commit -m "Configure CORS to allow Vercel frontend domain"
git push origin main
```

## Step 3: Railway Will Auto-Redeploy

Railway will automatically detect the changes and redeploy your backend.

## Step 4: Test Again

1. Wait for Railway deployment to complete
2. Visit: `https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app/user/signup.html`
3. Try sending OTP again
4. Check browser console for any remaining errors

## Verify CORS is Working

Test in browser console:
```javascript
fetch('https://canteen-management-system-production-bfe6.up.railway.app/api/users/send-otp/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ phone: '+919702086462' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

If CORS is configured correctly, this should work without CORS errors.

## Common CORS Errors

### Error: "Access to fetch at '...' from origin '...' has been blocked by CORS policy"
**Solution**: Add the frontend origin to CORS allowed origins list

### Error: "No 'Access-Control-Allow-Origin' header is present"
**Solution**: CORS middleware is not configured or not working

### Error: "Credentials flag is true, but Access-Control-Allow-Credentials is not 'true'"
**Solution**: Set `credentials: true` in CORS config

## Quick Test

After updating CORS and redeploying, test the connection:

1. Open browser console on your Vercel site
2. Run:
```javascript
fetch('/api/users/send-otp/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '+919702086462' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

If you see a response (even an error response), CORS is working! If you see a CORS error, the configuration needs adjustment.