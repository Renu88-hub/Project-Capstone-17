const Treaty = require('../models/Treaty');

const getTreatyNextId = async () => {
  const exists = await Treaty.exists();
  if (!exists) return 1;
  const last = await Treaty.find().sort({ _id: -1 }).limit(1);
  return last[0]._id + 1;
};

exports.createTreaty = async (req, res) => {
  try {

      const nextId = await getTreatyNextId();
      const treaty = await Treaty.create({
            _id: nextId,
            ...req.body,
        });
    res.status(201).json(treaty);
  } catch (err) {
    console.error("Error creating treaty:", err);
    res.status(500).json({ message: "Error creating treaty", error: err });
  }
};

exports.getTreaties = async (req, res) => {
  try {
    const treaties = await Treaty.find();
    res.status(200).json(treaties);
  } catch (err) {
    res.status(500).json({ message: "Error fetching treaties", error: err });
  }
};
