const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String,
  role: { type: String, enum: ['customer', 'seller', 'admin'], default: 'customer' }
});

module.exports = mongoose.model('User', UserSchema);
