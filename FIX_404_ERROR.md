# Fix 404 Error: `/api/users/send-otp/` Not Found

## Problem
Getting `404 (Not Found)` when trying to send OTP. This means the backend route doesn't exist or isn't configured correctly.

## Error Details
```
POST https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app/api/users/send-otp/ 404 (Not Found)
```

## Solution Steps

### Step 1: Verify Backend Route Exists

Check if your backend has the route defined. Look for:

**File**: `canteen-backend/src/routes/user.routes.js`

It should have something like:
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Send OTP route
router.post('/send-otp/', userController.sendOTP);

// Register route
router.post('/register/', userController.register);

module.exports = router;
```

### Step 2: Check Main Routes File

**File**: `canteen-backend/src/routes/index.js`

Should mount user routes:
```javascript
const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');

// Mount user routes at /api/users
router.use('/users', userRoutes);

module.exports = router;
```

### Step 3: Check App.js/Server.js

**File**: `canteen-backend/src/app.js` or `canteen-backend/src/server.js`

Should mount routes:
```javascript
const express = require('express');
const routes = require('./routes');

const app = express();

// Mount routes at /api
app.use('/api', routes);

// ... rest of configuration
```

### Step 4: Verify Controller Exists

**File**: `canteen-backend/src/controllers/user.controller.js`

Should have `sendOTP` function:
```javascript
exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    
    // Your OTP sending logic here
    // Generate OTP
    // Send via SMS/Email
    // Store OTP (in memory/database)
    
    res.status(200).json({ 
      message: 'OTP sent successfully',
      // Don't send actual OTP in response for security
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to send OTP',
      detail: error.message 
    });
  }
};
```

## Quick Fix: Create Missing Route

If the route doesn't exist, create it:

### 1. Update `user.routes.js`:

```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Send OTP endpoint
router.post('/send-otp/', userController.sendOTP);

// Register endpoint
router.post('/register/', userController.register);

module.exports = router;
```

### 2. Update `user.controller.js`:

```javascript
// Temporary OTP storage (use database in production)
const otpStore = new Map();

exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ 
        detail: 'Phone number is required' 
      });
    }
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP (expires in 10 minutes)
    otpStore.set(phone, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    });
    
    // TODO: Send OTP via SMS/Email service
    // For now, just log it (remove in production!)
    console.log(`OTP for ${phone}: ${otp}`);
    
    res.status(200).json({ 
      message: 'OTP sent successfully' 
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ 
      detail: 'Failed to send OTP. Please try again.' 
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { phone, otp, fullname, password, student_id } = req.body;
    
    // Verify OTP
    const storedOTP = otpStore.get(phone);
    if (!storedOTP || storedOTP.otp !== otp) {
      return res.status(400).json({ 
        detail: 'Invalid OTP' 
      });
    }
    
    if (Date.now() > storedOTP.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ 
        detail: 'OTP expired' 
      });
    }
    
    // TODO: Create user in database
    // TODO: Hash password
    // TODO: Generate JWT tokens
    
    // Clear OTP after successful verification
    otpStore.delete(phone);
    
    res.status(201).json({
      message: 'User registered successfully',
      // Return tokens here
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ 
      detail: 'Registration failed' 
    });
  }
};
```

### 3. Verify Route Mounting

Make sure routes are properly mounted in `app.js` or `server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app',
    'http://localhost:5501'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ detail: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
```

## Test After Fixing

1. **Commit and push changes:**
   ```bash
   git add canteen-backend/src/
   git commit -m "Add send-otp route and controller"
   git push origin main
   ```

2. **Wait for Railway to redeploy**

3. **Test the endpoint:**
   ```javascript
   // In browser console
   fetch('/api/users/send-otp/', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ phone: '+919702086462' })
   })
   .then(r => r.json())
   .then(console.log)
   .catch(console.error);
   ```

## Common Issues

### Issue: Route still returns 404
- Check Railway logs to see if backend started correctly
- Verify route path matches exactly: `/api/users/send-otp/`
- Check if routes are mounted correctly

### Issue: Backend crashes on startup
- Check Railway deployment logs
- Verify all dependencies are in package.json
- Check for syntax errors in code

### Issue: CORS errors after fixing 404
- See `CORS_FIX.md` for CORS configuration

## Next Steps

1. ✅ Check if route exists in backend
2. ✅ Create route if missing
3. ✅ Implement controller logic
4. ✅ Test endpoint directly
5. ✅ Test from frontend
6. ✅ Configure OTP service (SMS/Email) if needed