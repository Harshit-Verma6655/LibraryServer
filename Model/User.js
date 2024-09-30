const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['Teacher', 'Student', 'Institute'], required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
