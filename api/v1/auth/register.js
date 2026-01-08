import connectDB from '../../../src/db.js';
import User from '../../../src/models/User.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Name, email, and password are required' });
    }

    // Connect to database
    await connectDB();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();

    res.status(201).json({ 
      msg: 'User created successfully', 
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      msg: 'Internal server error',
      error: error.message 
    });
  }
}
