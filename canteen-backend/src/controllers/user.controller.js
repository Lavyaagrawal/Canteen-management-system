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
    console.log('Registration request received:', req.body);
    const { phone, fullname, password, student_id } = req.body;
    
    // Validate required fields
    if (!phone || !fullname || !password || !student_id) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ 
        detail: 'All fields are required (phone, fullname, password, student_id)',
        received: { phone: !!phone, fullname: !!fullname, password: !!password, student_id: !!student_id }
      });
    }
    
    // TODO: Check if user already exists in database
    // TODO: Hash password with bcrypt
    // TODO: Create user in database
    // TODO: Generate JWT tokens
    
    // For now, return success (implement database logic later)
    console.log('New user registration:', { phone, fullname, student_id });
    
    // Temporary response - implement proper user creation
    res.status(201).json({
      message: 'User registered successfully',
      access: 'temp_token_' + Date.now(), // Temporary token
      refresh: 'temp_refresh_token_' + Date.now() // Temporary refresh token
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ 
      detail: 'Registration failed: ' + error.message,
      error: error.toString()
    });
  }
};