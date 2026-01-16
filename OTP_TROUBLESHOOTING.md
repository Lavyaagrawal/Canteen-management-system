# OTP Sending Error - Troubleshooting Guide

## Problem
"Failed to send OTP. Please try again." error when trying to send OTP during signup.

## Possible Causes

### 1. Backend Endpoint Not Working
The backend endpoint `/api/users/send-otp/` might not be implemented or is returning an error.

### 2. CORS Issues
The backend might not be allowing requests from your Vercel frontend domain.

### 3. Network/Connectivity Issues
The API request might be failing due to network issues.

### 4. Backend Not Running
The Railway backend service might be down or not responding.

## How to Debug

### Step 1: Check Browser Console
1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Try sending OTP again
4. Look for any error messages
5. Check the **Network** tab to see the API request details

### Step 2: Test Backend Endpoint Directly
Try accessing the endpoint directly in your browser or using curl:

```bash
curl -X POST https://canteen-management-system-production-bfe6.up.railway.app/api/users/send-otp/ \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919702086462"}'
```

Or test in browser console:
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

### Step 3: Check Railway Logs
1. Go to Railway dashboard
2. Click on your backend service
3. Go to **Deployments** tab
4. Click on latest deployment
5. Check **Deploy Logs** for any errors

### Step 4: Check CORS Configuration
Make sure your backend CORS allows your Vercel domain:

```javascript
// In your backend (app.js or server.js)
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-frontend.vercel.app', // Your Vercel URL
    'http://localhost:5501', // For local development
  ],
  credentials: true
}));
```

### Step 5: Verify Backend Route Exists
Check if the `/api/users/send-otp/` route is implemented in your backend:
- Check `canteen-backend/src/routes/user.routes.js` or similar
- Verify the route handler exists
- Check if it's properly connected to the main router

## Quick Fixes

### Fix 1: Improve Error Handling
Update the frontend to show actual error messages:

```javascript
const response = await fetch('/api/users/send-otp/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    phone: `+91${phone}`
  })
});

if (response.ok) {
  otpSent = true;
  otpGroup.style.display = 'block';
  startResendTimer();
  alert('OTP sent to your phone number');
} else {
  const errorData = await response.json().catch(() => ({}));
  console.error('OTP Error:', errorData);
  alert(errorData.detail || errorData.message || 'Failed to send OTP. Please try again.');
}
```

### Fix 2: Check Backend Implementation
Make sure your backend has:
1. The route defined: `/api/users/send-otp/`
2. Proper error handling
3. OTP service configured (email/SMS provider)
4. Environment variables set (if using external services)

### Fix 3: Verify Environment Variables
Check Railway → Settings → Variables:
- Email service credentials (if using email for OTP)
- SMS service credentials (if using SMS)
- Any other OTP-related configuration

## Common Solutions

### Solution 1: Backend Route Missing
If the route doesn't exist, you need to implement it in your backend.

### Solution 2: CORS Not Configured
Add your Vercel domain to CORS and redeploy backend.

### Solution 3: OTP Service Not Configured
If using email/SMS service, make sure credentials are set in Railway environment variables.

### Solution 4: Backend Service Down
Check Railway dashboard - service should be green/running.

## Next Steps

1. **Check Browser Console** - See actual error message
2. **Test Backend Directly** - Verify endpoint works
3. **Check Railway Logs** - See backend errors
4. **Fix CORS** - If CORS errors appear
5. **Implement Missing Route** - If route doesn't exist
6. **Configure OTP Service** - If using external service

## Need More Help?

Share:
1. Browser console error message
2. Network tab request/response details
3. Railway backend logs
4. Backend route implementation (if available)