"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const adminAuth_1 = require("../middleware/adminAuth");
const router = (0, express_1.Router)();
// Apply rate limiting to all admin auth endpoints (temporarily disabled for testing)
// router.use(authLimiter);
// Admin authentication
router.post('/login', adminController_1.adminLogin);
router.get('/profile', adminAuth_1.adminAuth, adminController_1.getAdminProfile);
// Dashboard
router.get('/dashboard', adminAuth_1.adminAuth, adminController_1.getDashboardStats);
// User management
router.get('/users', adminAuth_1.adminAuth, adminController_1.getAllUsers);
router.get('/users/:id', adminAuth_1.adminAuth, adminController_1.getUserById);
router.put('/users/:id/role', adminAuth_1.adminAuth, adminController_1.updateUserRole);
router.delete('/users/:id', adminAuth_1.adminAuth, adminController_1.deleteUser);
// Job management
router.get('/jobs', adminAuth_1.adminAuth, adminController_1.getAllJobs);
router.post('/jobs', adminAuth_1.adminAuth, adminController_1.createJob);
router.put('/jobs/:id', adminAuth_1.adminAuth, adminController_1.updateJob);
router.delete('/jobs/:id', adminAuth_1.adminAuth, adminController_1.deleteJob);
router.put('/jobs/:id/status', adminAuth_1.adminAuth, adminController_1.updateJobStatus);
// Application management
router.get('/applications', adminAuth_1.adminAuth, adminController_1.getAllApplications);
router.post('/applications', adminAuth_1.adminAuth, adminController_1.createApplication);
router.put('/applications/:id', adminAuth_1.adminAuth, adminController_1.updateApplication);
router.delete('/applications/:id', adminAuth_1.adminAuth, adminController_1.deleteApplication);
// News management
router.get('/news', adminAuth_1.adminAuth, adminController_1.getAllNews);
router.post('/news', adminAuth_1.adminAuth, adminController_1.createNews);
router.put('/news/:id', adminAuth_1.adminAuth, adminController_1.updateNews);
router.delete('/news/:id', adminAuth_1.adminAuth, adminController_1.deleteNews);
// Hiring management
router.get('/hirings', adminAuth_1.adminAuth, adminController_1.getAllHirings);
router.post('/hirings', adminAuth_1.adminAuth, adminController_1.createHiring);
router.put('/hirings/:id', adminAuth_1.adminAuth, adminController_1.updateHiring);
router.delete('/hirings/:id', adminAuth_1.adminAuth, adminController_1.deleteHiring);
// NewJobs management
router.get('/newjobs', adminAuth_1.adminAuth, adminController_1.getAllNewJobs);
router.post('/newjobs', adminAuth_1.adminAuth, adminController_1.createNewJob);
router.put('/newjobs/:id', adminAuth_1.adminAuth, adminController_1.updateNewJob);
router.delete('/newjobs/:id', adminAuth_1.adminAuth, adminController_1.deleteNewJob);
// System settings
router.get('/settings', adminAuth_1.adminAuth, adminController_1.getSystemSettings);
router.put('/settings', adminAuth_1.adminAuth, adminController_1.updateSystemSettings);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map