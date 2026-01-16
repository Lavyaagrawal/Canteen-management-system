# Fix Vercel 404 Error - API Rewrites Not Working

## Problem
Still getting 404 errors even after adding `frontend/vercel.json`. This means Vercel rewrites aren't working.

## Solution: Update Vercel Project Settings

### Option 1: Check Root Directory Setting

1. Go to Vercel Dashboard
2. Select your project: `canteen-management-system`
3. Go to **Settings** → **General**
4. Check **Root Directory**:
   - If it's set to `frontend`, that's correct
   - If it's empty or set to something else, change it to `frontend`

### Option 2: Verify vercel.json Location

The `vercel.json` should be in the **root** of your repository (not in `frontend/` folder) if Root Directory is empty.

**Current setup:**
- Root Directory: `frontend` → `vercel.json` should be in `frontend/vercel.json` ✅ (already done)
- Root Directory: empty → `vercel.json` should be in root `vercel.json`

### Option 3: Alternative - Use Vercel Dashboard Configuration

Instead of `vercel.json`, configure rewrites in Vercel dashboard:

1. Go to Vercel Dashboard → Your Project
2. Go to **Settings** → **Functions** or **Deployments**
3. Look for **Rewrites** or **Redirects** section
4. Add rewrite rule:
   - **Source**: `/api/:path*`
   - **Destination**: `https://canteen-management-system-production-bfe6.up.railway.app/api/:path*`

### Option 4: Test Backend Directly First

Before fixing Vercel, verify backend is working:

**Test in browser console:**
```javascript
fetch('https://canteen-management-system-production-bfe6.up.railway.app/api/users/send-otp/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '+919702086462' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

If this works, backend is fine. Issue is Vercel rewrites.

### Option 5: Update Root vercel.json

If Root Directory is empty, update root `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://canteen-management-system-production-bfe6.up.railway.app/api/:path*"
    }
  ]
}
```

## Quick Diagnostic Steps

1. **Check Vercel Root Directory:**
   - Dashboard → Settings → General → Root Directory
   - Note what it says

2. **Check which vercel.json is being used:**
   - If Root Directory = `frontend` → uses `frontend/vercel.json`
   - If Root Directory = empty → uses root `vercel.json`

3. **Test backend directly:**
   - Use the fetch command above
   - If it works, backend is fine

4. **Check Vercel deployment logs:**
   - Go to Deployments → Latest deployment → Build Logs
   - Look for any errors about vercel.json

## Most Likely Fix

**If Root Directory = `frontend`:**
- ✅ `frontend/vercel.json` exists (already done)
- Make sure it has correct content
- Redeploy

**If Root Directory = empty:**
- Update root `vercel.json` with rewrites
- Redeploy

## Still Not Working?

Try this alternative approach - update frontend code to use full Railway URL directly (temporary fix):

In `frontend/user/signup.html`, change:
```javascript
const response = await fetch('/api/users/send-otp/', {
```

To:
```javascript
const API_BASE = 'https://canteen-management-system-production-bfe6.up.railway.app';
const response = await fetch(`${API_BASE}/api/users/send-otp/`, {
```

This bypasses Vercel rewrites entirely and calls Railway directly.