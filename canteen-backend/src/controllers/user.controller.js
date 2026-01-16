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
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });
    
    // TODO: Send OTP via SMS/Email service
    // For now, log it for testing (remove in production!)
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
    // TODO: Hash password with bcrypt
    // TODO: Generate JWT tokens
    
    // For now, return success (implement database logic later)
    // Clear OTP after successful verification
    otpStore.delete(phone);
    
    // Temporary response - implement proper user creation
    res.status(201).json({
      message: 'User registered successfully',
      access: 'temp_token', // Replace with actual JWT
      refresh: 'temp_refresh_token' // Replace with actual refresh token
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ 
      detail: 'Registration failed' 
    });
  }
};