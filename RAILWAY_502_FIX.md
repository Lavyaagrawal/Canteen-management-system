# Fix 502 Bad Gateway Error

## Problem
Getting `502 Bad Gateway` on OPTIONS preflight requests to Railway backend.

## Possible Causes

1. **Backend not running** - Railway service might be down
2. **CORS not handling OPTIONS properly** - Preflight requests failing
3. **Server crashing on OPTIONS** - Backend error on OPTIONS requests

## Solution Applied

1. **Updated CORS to allow all origins** (`origin: '*'`)
2. **Added explicit OPTIONS handler** before routes
3. **Set proper CORS headers** manually for OPTIONS

## Next Steps

### 1. Check Railway Service Status
1. Go to Railway Dashboard
2. Check if your backend service is **green/running**
3. If it's red/crashed, check logs

### 2. Check Railway Logs
1. Railway Dashboard → Your Service
2. Go to **Deployments** → Latest deployment
3. Check **Deploy Logs** for errors
4. Look for any crashes or startup errors

### 3. Wait for Redeploy
- New commit pushed: `febc8d5` (CORS fix)
- Railway should auto-redeploy
- Wait 2-5 minutes

### 4. Test Backend Directly

After redeploy, test:

```javascript
// Test OPTIONS (preflight)
fetch('https://canteen-management-system-production-bfe6.up.railway.app/api/users/register/', {
  method: 'OPTIONS',
  headers: {
    'Origin': 'https://canteen-management-system-mocha.vercel.app',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'content-type'
  }
})
.then(r => {
  console.log('OPTIONS Status:', r.status);
  console.log('CORS Headers:', {
    'Access-Control-Allow-Origin': r.headers.get('Access-Control-Allow-Origin'),
    'Access-Control-Allow-Methods': r.headers.get('Access-Control-Allow-Methods')
  });
});

// Test POST (actual request)
fetch('https://canteen-management-system-production-bfe6.up.railway.app/api/users/register/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullname: 'Test User',
    phone: '+919876543210',
    password: 'test123',
    student_id: 'TEST123'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

## If Still Getting 502

1. **Railway Service Down:**
   - Check Railway dashboard
   - Restart service if needed
   - Check for crashes in logs

2. **Port Configuration:**
   - Verify server listens on `process.env.PORT`
   - Railway sets PORT automatically

3. **Health Check:**
   - Visit: `https://canteen-management-system-production-bfe6.up.railway.app/health`
   - Should return: `{"status":"ok","message":"Server is running"}`
   - If 502, backend is not running

## Common Fixes

- ✅ CORS configured correctly
- ✅ OPTIONS handler added
- ⏳ Wait for Railway redeploy
- ⏳ Verify service is running
- ⏳ Check Railway logs for errors