import supabase from '../db.js';

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password required',
      });
    }

    // Supabase login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // If error
    if (error) {
      return res.status(401).json({
        message: error.message,
      });
    }

    // Success
    return res.status(200).json({
      message: 'Login successful',
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};
