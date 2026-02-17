const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: Number,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['UNDERWRITER', 'CLAIMS_ADJUSTER', 'REINSURANCE_MANAGER', 'ADMIN'], 
    default: 'UNDERWRITER' 
  },
  permissions: { type: String, required: true },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  lastLoginAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true, _id: false });

module.exports = mongoose.model('User', userSchema);

