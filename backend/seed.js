require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./src/config/db');

const User = require('./src/models/User');
const Policy = require('./src/models/Policy');
const Claim = require('./src/models/Claim');
const Reinsurer = require('./src/models/Reinsurer');
const Treaty = require('./src/models/Treaty');
const RiskAllocation = require('./src/models/RiskAllocation');
const AuditLog = require('./src/models/AuditLog');

const seedData = async () => {
    try {
        await connectDB();

        console.log("Clearing existing data...");
        await User.deleteMany();
        await Policy.deleteMany();
        await Claim.deleteMany();
        await Reinsurer.deleteMany();
        await Treaty.deleteMany();
        await RiskAllocation.deleteMany();
        await AuditLog.deleteMany();

        console.log("Seeding Users...");

        const hashedPassword = await bcrypt.hash("admin@123", 10);

        const users = await User.insertMany([
            {
                _id: 1,
                username: "admin",
                email: "admin@inc.com",
                passwordHash: hashedPassword,
                role: "ADMIN",
                permissions: "ALL"
            },
            {
                _id: 2,
                username: "underwriter1",
                email: "uw@inc.com",
                passwordHash: hashedPassword,
                role: "UNDERWRITER",
                permissions: "POLICY_CREATE"
            },
            {
                _id: 3,
                username: "adjuster1",
                email: "claims@inc.com",
                passwordHash: hashedPassword,
                role: "CLAIMS_ADJUSTER",
                permissions: "CLAIM_PROCESS"
            },
            {
                _id: 4,
                username: "reinsmanager",
                email: "reins@inc.com",
                passwordHash: hashedPassword,
                role: "REINSURANCE_MANAGER",
                permissions: "TREATY_MANAGE"
            }
        ]);

        console.log("Seeding Reinsurers...");

        const reinsurers = await Reinsurer.insertMany([
            {
                _id: 1,
                name: "Global Re",
                code: "GR001",
                country: "UK",
                rating: "AAA",
                contactEmail: "contact@re.com"
            },
            {
                _id: 2,
                name: "Secure Re",
                code: "SR001",
                country: "Germany",
                rating: "AA",
                contactEmail: "contact@re.com"
            }
        ]);

        console.log("Seeding Treaties...");

        const treaties = await Treaty.insertMany([
            {
                _id: 1,
                treatyName: "Health Quota Share 40%",
                treatyType: "QUOTA_SHARE",
                reinsurerId: 1,
                sharePercentage: 40,
                retentionLimit: 5000000,
                treatyLimit: 50000000,
                applicableLOBs: "HEALTH",
                effectiveFrom: new Date(),
                effectiveTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            },
            {
                _id: 2,
                treatyName: "Health Quota Share 20%",
                treatyType: "QUOTA_SHARE",
                reinsurerId: 2,
                sharePercentage: 20,
                retentionLimit: 5000000,
                treatyLimit: 50000000,
                applicableLOBs: "HEALTH",
                effectiveFrom: new Date(),
                effectiveTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            }
        ]);

        console.log("Seeding Policy...");

        const policy = await Policy.create({
            _id: 1,
            policyNumber: "POL1001",
            insuredName: "John Doe",
            insuredType: "INDIVIDUAL",
            lineOfBusiness: "HEALTH",
            sumInsured: 10000000,
            premium: 50000,
            retentionLimit: 5000000,
            status: "ACTIVE",
            effectiveFrom: new Date(),
            effectiveTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            createdBy: 2,
            approvedBy: 2
        });

        console.log("Seeding Risk Allocation...");

        const allocations = [
            {
                reinsurerId: 1,
                treatyId: 1,
                allocatedAmount: 4000000,
                allocatedPercentage: 40
            },
            {
                reinsurerId: 2,
                treatyId: 2,
                allocatedAmount: 2000000,
                allocatedPercentage: 20
            }
        ];

        await RiskAllocation.create({
            _id: 1,
            policyId: 1,
            allocations,
            retainedAmount: 4000000,
            calculatedBy: 2
        });

        console.log("Seeding Claim...");

        await Claim.create({
            _id: 1,
            claimNumber: "CLM1001",
            policyId: 1,
            claimAmount: 2000000,
            approvedAmount: 2000000,
            status: "APPROVED",
            incidentDate: new Date(),
            handledBy: 3,
            remarks: "Approved without discrepancy"
        });

        console.log("Seeding completed successfully!");
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedData();