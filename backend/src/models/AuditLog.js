const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  _id: Number,
  entityType: { type: String, enum: ['POLICY','CLAIM','TREATY','USER'] },
  entityId: Number,
  action: { type: String, enum: ['CREATE','UPDATE','DELETE','APPROVE'] },
  oldValue: Object,
  newValue: Object,
  performedBy: { type: mongoose.Schema.Types.Number, ref: 'User' },
  performedAt: { type: Date, default: Date.now },
  ipAddress: String
}, { timestamps: true, _id: false });

module.exports = mongoose.model('AuditLog', auditLogSchema);
