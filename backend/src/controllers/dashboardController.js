const Policy = require('../models/Policy');
const Claim = require('../models/Claim');

exports.getSummary = async (req, res) => {
    const exposure = await Policy.aggregate([
        { $match: { status: "ACTIVE" } },
        { $group: { _id: null, total: { $sum: "$sumInsured" } } }
    ]);

    const claims = await Claim.aggregate([
        { $group: { _id: null, total: { $sum: "$approvedAmount" } } }
    ]);

    res.json({
        totalExposure: exposure[0]?.total || 0,
        totalClaims: claims[0]?.total || 0
    });
};
