const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  _id: Number,
  claimNumber: { type: String, unique: true },
  policyId: { type: mongoose.Schema.Types.Number, ref: 'Policy' },
  policyNumber: { type: String }, 
  insuredName: { type: String },
  claimAmount: Number,
  approvedAmount: Number,
  status: { 
    type: String, 
    enum: ['SUBMITTED', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'SETTLED'], 
    default: 'SUBMITTED' 
  },
  incidentDate: Date,
  reportedDate: { type: Date, default: Date.now },
  handledBy: { type: mongoose.Schema.Types.Number, ref: 'User' },
  remarks: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true, _id: false });

module.exports = mongoose.model('Claim', claimSchema);
