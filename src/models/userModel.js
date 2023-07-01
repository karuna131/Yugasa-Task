const mongoose = require('../config/dbConnection');

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  token: {
    type: String,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
}, {timestamps: true});

module.exports = mongoose.model('user', userSchema);
