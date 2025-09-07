"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.verifyEmailSchema = exports.forgotPasswordSchema = exports.resetPasswordSchema = exports.loginSchema = exports.registerSchema = exports.nameSchema = exports.emailSchema = exports.passwordSchema = void 0;
const zod_1 = require("zod");
exports.passwordSchema = zod_1.z
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ hoa')
    .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ thường')
    .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất một số')
    .regex(/[^\w\s]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt');
exports.emailSchema = zod_1.z
    .string()
    .email('Định dạng email không hợp lệ')
    .toLowerCase()
    .trim();
exports.nameSchema = zod_1.z
    .string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được vượt quá 50 ký tự')
    .regex(/^[\p{L}\s-]+$/u, 'Tên chỉ được chứa chữ cái, dấu cách và dấu gạch ngang')
    .trim();
exports.registerSchema = zod_1.z.object({
    name: exports.nameSchema,
    email: exports.emailSchema,
    password: exports.passwordSchema,
});
exports.loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: zod_1.z.string().min(1, 'Vui lòng nhập mật khẩu'),
});
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Token không hợp lệ'),
    password: exports.passwordSchema,
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: exports.emailSchema,
});
exports.verifyEmailSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Token không hợp lệ'),
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, 'Refresh token không hợp lệ'),
});
//# sourceMappingURL=validators.js.map