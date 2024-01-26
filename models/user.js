const mongoose = require('mongoose');
const validator = require('validator');

// Create a mongoose schema for user
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return value.length >= 6;
      },
      message: 'Password must be at least 6 characters long',
    },
  }
});
const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;