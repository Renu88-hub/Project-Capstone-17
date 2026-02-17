const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

const getUserNextId = async () => {
    const exists = await User.exists();
    if (!exists) return 1;
    const last = await User.find().sort({ _id: -1 }).limit(1);
    return last[0]._id + 1;
};

const getAuditNextId = async () => {
    const exists = await AuditLog.exists();
    if (!exists) return 1;
    const last = await AuditLog.find().sort({ _id: -1 }).limit(1);
    return last[0]._id + 1;
};


exports.createUser = async (req, res) => {
    const nextUserId = await getUserNextId();
    const nextAuditId = await getAuditNextId();
    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
        _id: nextUserId,
        username: req.body.username,
        email: req.body.email,
        passwordHash: hashed,
        role: req.body.role,
        permissions: req.body.permissions
    });

    await AuditLog.create({
        _id: nextAuditId,
        entityType: "USER",
        entityId: user._id,
        action: "CREATE",
        newValue: user,
        performedBy: req.user._id,
        ipAddress: "system"
    });

    res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};