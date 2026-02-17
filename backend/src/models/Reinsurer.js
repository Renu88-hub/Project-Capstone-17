const mongoose = require('mongoose');

const reinsurerSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  code: String,
  country: String,
  rating: { type: String, enum: ['AAA','AA','A','BBB'] },
  contactEmail: String,
  status: { type: String, enum: ['ACTIVE','INACTIVE'], default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true, _id: false });

module.exports = mongoose.model('Reinsurer', reinsurerSchema);
