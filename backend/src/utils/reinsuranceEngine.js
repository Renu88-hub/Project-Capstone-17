const Treaty = require('../models/Treaty');
const RiskAllocation = require('../models/RiskAllocation');
const AuditLog = require('../models/AuditLog');

const getNextId = async () => {
    const exists = await RiskAllocation.exists();
    if (!exists) return 1;
    const last = await RiskAllocation.find().sort({ _id: -1 }).limit(1);
    return last[0]._id + 1;
};

const getAuditNextId = async () => {
    const exists = await AuditLog.exists();
    if (!exists) return 1;
    const last = await AuditLog.find().sort({ _id: -1 }).limit(1);
    return last[0]._id + 1;
};


exports.allocateReinsurance = async (policy, user) => {

     if (policy.sumInsured <= policy.retentionLimit) {
        return { allocations: [], retainedAmount: policy.sumInsured };
    }

    const oldValue = {
        allocations: [],
        retainedAmount: policy.sumInsured
    };

    const treaties = await Treaty.find({
        status: "ACTIVE",
        applicableLOBs: policy.lineOfBusiness
    });

    let totalAllocated = 0;
    const allocations = [];

    for (let treaty of treaties) {

        let exposureAboveRetention = policy.sumInsured - policy.retentionLimit;
        let amount = (exposureAboveRetention * treaty.sharePercentage) / 100;

        if (amount > treaty.treatyLimit) {
            amount = treaty.treatyLimit;
        }

         if (totalAllocated + amount > policy.sumInsured) {
            amount = policy.sumInsured - totalAllocated;
        }


        if (amount <= 0) continue;

        allocations.push({
            reinsurerId: treaty.reinsurerId,
            treatyId: treaty._id,
            allocatedAmount: amount,
            allocatedPercentage: Number(
                ((amount / policy.sumInsured) * 100).toFixed(2)
            )
        });

        totalAllocated += amount;
    }

    const retainedAmount = policy.sumInsured - totalAllocated;

    const nextId = await getNextId();

    await RiskAllocation.create({
        _id: nextId,
        policyId: policy._id,
        allocations,
        retainedAmount,        
        calculatedAt: new Date(),
        calculatedBy: user._id
    });

    const nextAuditId = await getAuditNextId();

    await AuditLog.create({
            _id: nextAuditId,
            entityType: "POLICY",
            entityId: policy._id,
            action: "UPDATE",
            oldValue,
            newValue: { allocations, retainedAmount },
            performedBy: user._id,
            performedAt: new Date(),
            ipAddress: "system"
    });

    return { allocations, retainedAmount };
};
