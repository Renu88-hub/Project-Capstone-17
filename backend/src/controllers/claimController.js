const Policy = require('../models/Policy');
const Claim = require('../models/Claim');
const AuditLog = require('../models/AuditLog');

const allowedTransitions = {
    SUBMITTED: ["IN_REVIEW"],
    IN_REVIEW: ["APPROVED", "REJECTED"],
    APPROVED: ["SETTLED"],
    REJECTED: [],
    SETTLED: []
};

const getClaimNextId = async () => {
    const exists = await Claim.exists();
    if (!exists) return 1;
    const last = await Claim.find().sort({ _id: -1 }).limit(1);
    return last[0]._id + 1;
};

const getAuditNextId = async () => {
    const exists = await AuditLog.exists();
    if (!exists) return 1;
    const last = await AuditLog.find().sort({ _id: -1 }).limit(1);
    return last[0]._id + 1;
};


exports.createClaim = async (req, res) => {
    try {
    const nextClaimId = await getClaimNextId();
    const nextAuditId = await getAuditNextId();

    const claim = await Claim.create({
        _id: nextClaimId,
        claimNumber: "CLM" + nextClaimId,
        ...req.body,
    });

     await AuditLog.create({
        _id: nextAuditId,
        entityType: "CLAIM",
        entityId: claim._id,
        action: "CREATE",
        newValue: claim,
        performedBy: req.user._id,
        ipAddress: "system"
    });

    res.status(201).json(claim);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    const claim = await Claim.findById(id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });


    if (!allowedTransitions[claim.status].includes(status)) {
      return res.status(400).json({
        message: `Invalid status transition from ${claim.status} to ${status}`,
      });
    }

 
    const oldValue = { ...claim._doc };
    claim.status = status;
    await claim.save();


    const nextAuditId = await getAuditNextId();
    await AuditLog.create({
      _id: nextAuditId,
      entityType: "CLAIM",
      entityId: claim._id,
      action: "UPDATE",
      oldValue,
      newValue: claim,
      performedBy: req.user._id,
      ipAddress: req.ip,  
    });

    res.json(claim);  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.find().sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });
    res.json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
