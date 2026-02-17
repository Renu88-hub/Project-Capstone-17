const mongoose = require('mongoose');

const treatySchema = new mongoose.Schema({
  _id: Number,
  treatyName: String,
  treatyType: { type: String, enum: ['QUOTA_SHARE','SURPLUS'] },
  reinsurerId: { type: mongoose.Schema.Types.Number, ref: 'Reinsurer' },
  sharePercentage: Number,
  retentionLimit: Number,
  treatyLimit: Number,
  applicableLOBs: { type: String, enum: ['HEALTH', 'MOTOR', 'LIFE', 'PROPERTY'] },
  effectiveTo: Date,
  status: { type: String, enum: ['ACTIVE','EXPIRED'], default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Treaty', treatySchema);
