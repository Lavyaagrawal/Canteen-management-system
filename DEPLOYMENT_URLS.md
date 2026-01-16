# Deployment URLs

## Frontend (Vercel)
**URL**: `https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app`

**Direct Links:**
- Homepage: `https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app/`
- User Signup: `https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app/user/signup.html`
- User Login: `https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app/user/login.html`
- User Home: `https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app/user/index.html`

## Backend (Railway)
**URL**: `https://canteen-management-system-production-bfe6.up.railway.app`

**API Endpoints:**
- Base: `https://canteen-management-system-production-bfe6.up.railway.app/api/`
- Send OTP: `https://canteen-management-system-production-bfe6.up.railway.app/api/users/send-otp/`
- Register: `https://canteen-management-system-production-bfe6.up.railway.app/api/users/register/`
- Login: `https://canteen-management-system-production-bfe6.up.railway.app/api/users/login/`

## Configuration

### Vercel Configuration (vercel.json)
- API rewrites configured to proxy `/api/*` requests to Railway backend
- Output directory: `frontend`

### CORS Configuration Needed
Backend needs to allow requests from:
- `https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app`
- `http://localhost:5501` (for local development)

## Testing

### Test Backend Directly
```bash
curl -X POST https://canteen-management-system-production-bfe6.up.railway.app/api/users/send-otp/ \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919702086462"}'
```

### Test Frontend-Backend Connection
Visit: `https://canteen-management-system-f90aanhw0-lavya-agrawal-s-projects.vercel.app/user/signup.html`

Try sending OTP and check browser console for errors.