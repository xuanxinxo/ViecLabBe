"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_js_1 = require("../controllers/adminController.js");
const adminAuth_js_1 = require("../middleware/adminAuth.js");
const router = (0, express_1.Router)();
// Apply rate limiting to all admin auth endpoints (temporarily disabled for testing)
// router.use(authLimiter);
// Admin authentication
router.post('/login', adminController_js_1.adminLogin);
router.get('/profile', adminAuth_js_1.adminAuth, adminController_js_1.getAdminProfile);
// Dashboard
router.get('/dashboard', adminAuth_js_1.adminAuth, adminController_js_1.getDashboardStats);
// User management
router.get('/users', adminAuth_js_1.adminAuth, adminController_js_1.getAllUsers);
router.get('/users/:id', adminAuth_js_1.adminAuth, adminController_js_1.getUserById);
router.put('/users/:id/role', adminAuth_js_1.adminAuth, adminController_js_1.updateUserRole);
router.delete('/users/:id', adminAuth_js_1.adminAuth, adminController_js_1.deleteUser);
// Job management
router.get('/jobs', adminAuth_js_1.adminAuth, adminController_js_1.getAllJobs);
router.put('/jobs/:id/status', adminAuth_js_1.adminAuth, adminController_js_1.updateJobStatus);
// Application management
router.get('/applications', adminAuth_js_1.adminAuth, adminController_js_1.getAllApplications);
// News management
router.get('/news', adminAuth_js_1.adminAuth, adminController_js_1.getAllNews);
router.post('/news', adminAuth_js_1.adminAuth, adminController_js_1.createNews);
router.put('/news/:id', adminAuth_js_1.adminAuth, adminController_js_1.updateNews);
router.delete('/news/:id', adminAuth_js_1.adminAuth, adminController_js_1.deleteNews);
// Hiring management
router.get('/hirings', adminAuth_js_1.adminAuth, adminController_js_1.getAllHirings);
router.post('/hirings', adminAuth_js_1.adminAuth, adminController_js_1.createHiring);
router.put('/hirings/:id', adminAuth_js_1.adminAuth, adminController_js_1.updateHiring);
router.delete('/hirings/:id', adminAuth_js_1.adminAuth, adminController_js_1.deleteHiring);
// System settings
router.get('/settings', adminAuth_js_1.adminAuth, adminController_js_1.getSystemSettings);
router.put('/settings', adminAuth_js_1.adminAuth, adminController_js_1.updateSystemSettings);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map