"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const tokens_1 = require("../utils/tokens");
// Simple admin login
const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Simple admin credentials (you can change these)
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        if (username !== adminUsername || password !== adminPassword) {
            return res.status(401).json({
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
        }
        // Generate token for admin (userId = 1, role = 'admin')
        const accessToken = (0, tokens_1.generateAccessToken)('1', username, 'admin');
        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            data: {
                user: {
                    id: '1',
                    username,
                    role: 'admin'
                },
                accessToken
            }
        });
    }
    catch (error) {
        console.error('Admin login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.adminLogin = adminLogin;
//# sourceMappingURL=adminController.js.map