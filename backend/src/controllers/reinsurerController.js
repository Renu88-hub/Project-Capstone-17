const Reinsurer = require('../models/Reinsurer');

const getReinsurerNextId = async () => {
  const exists = await Reinsurer.exists();
  if (!exists) return 1;
  const last = await Reinsurer.find().sort({ _id: -1 }).limit(1);
  return last[0]._id + 1;
};

exports.createReinsurer = async (req, res) => {
  try {
    const nextReinsurerId = await getReinsurerNextId();
    const reinsurer = await Reinsurer.create({ _id: nextReinsurerId, ...req.body });
    res.status(201).json(reinsurer);
  } catch (err) {
    res.status(500).json({ message: "Error creating reinsurer", error: err });
  }
};

exports.getReinsurers = async (req, res) => {
  try {
    const reinsurers = await Reinsurer.find();
    res.status(200).json(reinsurers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reinsurers", error: err });
  }
};
