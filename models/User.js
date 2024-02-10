const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  email: String,
  lastActivity: Date,
  visitedCheckout: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;