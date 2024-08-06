// code base
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// Check login
exports.authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "User chưa đăng nhập" });

        const data = jwt.verify(token, '123456');
        if (!data) { // token không hợp lệ
            return res.status(403).json({ message: "Token không hợp lệ" });
        }

        const user = await User.findById(data.id);
        if (!user) {
            return res.status(401).json({ message: "User không hợp lệ" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// First one => check login => next => check permission
// Check permission
exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Không có quyền truy cập" });
        }
        next();
    };
};