const mongoose = require('mongoose');
const userModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model('AdminUser', userModel);
module.exports = User;

