"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validateRequest_1 = require("../middleware/validateRequest");
const validators_1 = require("../utils/validators");
const rateLimit_1 = require("../middleware/rateLimit");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Apply rate limiting to all auth endpoints
router.use(rateLimit_1.authLimiter);
// Đăng ký người dùng mới
router.post('/register', (0, validateRequest_1.validateRequest)(validators_1.registerSchema), userController_1.register);
// Xác thực email
router.get('/verify-email/:token', userController_1.verifyEmail);
// Đăng nhập
router.post('/login', (0, validateRequest_1.validateRequest)(validators_1.loginSchema), userController_1.login);
// Làm mới token
router.post('/refresh-token', (0, validateRequest_1.validateRequest)(validators_1.refreshTokenSchema), userController_1.refreshToken);
// Đăng xuất
router.post('/logout', auth_1.auth, userController_1.logout);
// Quên mật khẩu
router.post('/forgot-password', (0, validateRequest_1.validateRequest)(validators_1.forgotPasswordSchema), userController_1.forgotPassword);
// Đặt lại mật khẩu
router.post('/reset-password/:token', (0, validateRequest_1.validateRequest)(validators_1.resetPasswordSchema), userController_1.resetPassword);
// Lấy thông tin người dùng hiện tại
router.get('/me', auth_1.auth, userController_1.getCurrentUser);
// Cập nhật thông tin người dùng
router.put('/me', auth_1.auth, userController_1.updateUser);
// Xóa tài khoản người dùng
router.delete('/me', auth_1.auth, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map