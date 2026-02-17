const Policy = require('../models/Policy');
const AuditLog = require('../models/AuditLog');
const { allocateReinsurance } = require('../utils/reinsuranceEngine');

const getPolicyNextId = async () => {
    const exists = await Policy.exists();
    if (!exists) return 1;
    const last = await Policy.find().sort({ _id: -1 }).limit(1);
    return last[0]._id + 1;
};

const getAuditNextId = async () => {
    const exists = await AuditLog.exists();
    if (!exists) return 1;
    const last = await AuditLog.find().sort({ _id: -1 }).limit(1);
    return last[0]._id + 1;
};

const validatePolicyInput = (body) => {
    const required = ['insuredName', 'lineOfBusiness', 'sumInsured', 'premium'];
    const missing = required.filter(f => !body[f]);
    if (missing.length > 0) {
        const err = new Error(`Missing required fields: ${missing.join(', ')}`);
        err.status = 400;
        throw err;
    }
};

const requireRole = (user, role) => {
    if (user.role !== role) {
        const err = new Error(`User does not have permission to perform this action`);
        err.status = 403;
        throw err;
    }
};

exports.createPolicy = async (req, res, next) => {
    try {
     requireRole(req.user, 'UNDERWRITER');
    // validatePolicyInput(req.body);

    const nextPolicyId = await getPolicyNextId();
    const nextAuditId = await getAuditNextId();

    const policy = await Policy.create({
        _id: nextPolicyId,
        policyNumber: "POL" + nextPolicyId,
        ...req.body,
        status: "DRAFT",
        createdBy: req.user._id
    });

    await AuditLog.create({
        _id: nextAuditId,
        entityType: "POLICY",
        entityId: policy._id,
        action: "CREATE",
        newValue: policy,
        performedBy: req.user._id,
        ipAddress: "system"
    });

    res.status(201).json(policy);
     } catch (err) {
        next(err);
    }
};

exports.getPolicies = async (req, res,next) => {
    try {
    const policies = await Policy.find();
    res.json(policies);
    } catch (err) {
    next(err);
  }
};

exports.getPolicyById = async (req, res, next) => {
  try {
    const policy = await Policy.findById(Number(req.params.id));
    if (!policy) return res.status(404).json({ message: "Policy not found" });

    res.json(policy);
  } catch (err) {
    next(err);
  }
};

exports.approvePolicy = async (req, res, next) => {
    try {
        requireRole(req.user, 'UNDERWRITER');

        const policy = await Policy.findById(req.params.id);
        if (!policy) {
            const err = new Error("Policy not found");
            err.status = 404;
            throw err;
        }

        // Only DRAFT policies can be approved
        if (policy.status !== "DRAFT") {
            const err = new Error("Only DRAFT policies can be approved");
            err.status = 400;
            throw err;
        }

    const oldValue = { status: policy.status, approvedBy: policy.approvedBy };
    policy.status = "ACTIVE";
    policy.approvedBy = req.user._id;
    policy.effectiveFrom = policy.effectiveFrom || new Date();
    await policy.save();

      if (policy.sumInsured > policy.retentionLimit) {
      await allocateReinsurance(policy, req.user);
    }

    const nextAuditId = await getAuditNextId();
    await AuditLog.create({
        _id: nextAuditId,
        entityType: "POLICY",
        entityId: policy._id,
        action: "APPROVE",
        oldValue,
        newValue: policy,
        performedBy: req.user._id,
        ipAddress: "system"
    });

    res.json(policy);
    } catch (err) {
        next(err);
    }
};


exports.rejectPolicy = async (req, res, next) => {
  try {
    const policy = await Policy.findById(Number(req.params.id));
    if (!policy) return res.status(404).json({ message: "Policy not found" });

    policy.status = "SUSPENDED";
    await policy.save();

    res.json(policy);
  } catch (err) {
    next(err);
  }
};


exports.getPolicyAuditLogs = async (req, res, next) => {
  try {

    const audits = await AuditLog.find({
      entityType: "POLICY",
      entityId: req.params.id
    }).sort({ _id: 1 });

    res.json(audits);

  } catch (err) {
    next(err);
  }
};


exports.getActivePolicies = async (req, res) => {
    try {
        const activePolicies = await Policy.find({ status: 'ACTIVE' }); 
        res.json(activePolicies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
