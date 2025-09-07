"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_js_1 = require("../controllers/userController.js");
const validateRequest_js_1 = require("../middleware/validateRequest.js");
const validators_js_1 = require("../utils/validators.js");
const rateLimit_js_1 = require("../middleware/rateLimit.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Apply rate limiting to all auth endpoints
router.use(rateLimit_js_1.authLimiter);
// Đăng ký người dùng mới
router.post('/register', (0, validateRequest_js_1.validateRequest)(validators_js_1.registerSchema), userController_js_1.register);
// Xác thực email
router.get('/verify-email/:token', userController_js_1.verifyEmail);
// Đăng nhập
router.post('/login', (0, validateRequest_js_1.validateRequest)(validators_js_1.loginSchema), userController_js_1.login);
// Làm mới token
router.post('/refresh-token', (0, validateRequest_js_1.validateRequest)(validators_js_1.refreshTokenSchema), userController_js_1.refreshToken);
// Đăng xuất
router.post('/logout', auth_js_1.auth, userController_js_1.logout);
// Quên mật khẩu
router.post('/forgot-password', (0, validateRequest_js_1.validateRequest)(validators_js_1.forgotPasswordSchema), userController_js_1.forgotPassword);
// Đặt lại mật khẩu
router.post('/reset-password/:token', (0, validateRequest_js_1.validateRequest)(validators_js_1.resetPasswordSchema), userController_js_1.resetPassword);
// Lấy thông tin người dùng hiện tại
router.get('/me', auth_js_1.auth, userController_js_1.getCurrentUser);
// Cập nhật thông tin người dùng
router.put('/me', auth_js_1.auth, userController_js_1.updateUser);
// Xóa tài khoản người dùng
router.delete('/me', auth_js_1.auth, userController_js_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map