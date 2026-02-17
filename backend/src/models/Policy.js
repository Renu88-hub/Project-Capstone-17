const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  _id: Number,
  policyNumber: { type: String, unique: true },
  insuredName: String,
  insuredType: { type: String, enum: ['INDIVIDUAL', 'CORPORATE'] },
  lineOfBusiness: { type: String, enum: ['HEALTH', 'MOTOR', 'LIFE', 'PROPERTY'] },
  sumInsured: Number,
  premium: Number,
  retentionLimit: Number,
  status: { type: String, enum: ['DRAFT', 'ACTIVE', 'SUSPENDED', 'EXPIRED'], default: 'DRAFT' },
  effectiveFrom: Date,
  effectiveTo: Date,
  createdBy: { type: mongoose.Schema.Types.Number, ref: 'User' },
  approvedBy: { type: mongoose.Schema.Types.Number, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Policy', policySchema);
