"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const adminAuth = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '') ||
        req.cookies?.adminToken;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Không có quyền truy cập. Vui lòng đăng nhập lại.'
        });
    }
    try {
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Check if user is admin
        if (decoded.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Truy cập bị từ chối. Bạn không có quyền admin.'
            });
        }
        // Add user from payload
        req.user = decoded;
        next();
        return; // Explicit return after next() to satisfy TypeScript
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.'
        });
    }
};
exports.adminAuth = adminAuth;
//# sourceMappingURL=adminAuth.js.map