
const validator = require('validator');
const User = require("../models/user");
const { createJSONToken, isValidPassword, hashPassword } = require('../util/auth');
const { getRedisClient } = require("../helpers/redis-connection");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const passwordMatch = await isValidPassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = createJSONToken(user)
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    const user = await User.findOne({ email });
    // Generate a JWT token
    const token = createJSONToken(user)
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      // Duplicate key (email) error
      error.status = 409;
      error.message = 'User with this email already exists';
    }
    next(error);
  }
}

const signout = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const client = getRedisClient();

    // // Add the token to the Redis blacklist for invalidation with a short expiration time
    const token_key = `bl_${token}`;
    await client.set(token_key, token);

    res.json({ message: 'Sign-out successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signin,
  signup,
  signout
}
