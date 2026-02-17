const mongoose = require('mongoose');

const riskAllocationSchema = new mongoose.Schema({
  _id: Number,
  policyId: { type: mongoose.Schema.Types.Number, ref: 'Policy' },
  allocations: [
    {
      reinsurerId: { type: mongoose.Schema.Types.Number, ref: 'Reinsurer' },
      treatyId: { type: mongoose.Schema.Types.Number, ref: 'Treaty' },
      allocatedAmount: Number,
      allocatedPercentage: Number
    }
  ],
  retainedAmount: Number,
  calculatedAt: { type: Date, default: Date.now },
  calculatedBy: { type: mongoose.Schema.Types.Number, ref: 'User' }
}, { timestamps: true, _id: false });

module.exports = mongoose.model('RiskAllocation', riskAllocationSchema);
