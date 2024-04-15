// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Email validation pattern
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
    // Phone number validation pattern
    match: /^[0-9]{10}$/
  },
  password: {
    type: String,
    required: true,
    // Minimum password length of 6 characters
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'owner', 'admin'],
    default: 'user'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
