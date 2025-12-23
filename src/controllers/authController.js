const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res, next) => { 
    try {
        
        const user = await User.create({...req.body});
        const token = user.createJWT();
        res.status(201).json({ user: { name: user.name }, token });
    } catch (error) {
        next(error); // 
    }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid Credentials' });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid Credentials' });
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: { name: user.name, email: user.email },
      token
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Something went wrong' });
  }
};

module.exports = { register, login };