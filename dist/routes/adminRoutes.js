"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const adminAuth_1 = require("../middleware/adminAuth");
// Import CRUD functions from controllers
const jobController_1 = require("../controllers/jobController");
const newsController_1 = require("../controllers/newsController");
const hiringController_1 = require("../controllers/hiringController");
const newJobController_1 = require("../controllers/newJobController");
const router = (0, express_1.Router)();
// Admin login endpoint
router.post('/login', adminController_1.adminLogin);
// Job management
router.post('/jobs', adminAuth_1.adminAuth, jobController_1.createJob);
router.put('/jobs/:id', adminAuth_1.adminAuth, jobController_1.updateJob);
router.delete('/jobs/:id', adminAuth_1.adminAuth, jobController_1.deleteJob);
// News management
router.post('/news', adminAuth_1.adminAuth, newsController_1.createNews);
router.put('/news/:id', adminAuth_1.adminAuth, newsController_1.updateNews);
router.delete('/news/:id', adminAuth_1.adminAuth, newsController_1.deleteNews);
// Hiring management
router.post('/hirings', adminAuth_1.adminAuth, hiringController_1.createHiring);
router.put('/hirings/:id', adminAuth_1.adminAuth, hiringController_1.updateHiring);
router.delete('/hirings/:id', adminAuth_1.adminAuth, hiringController_1.deleteHiring);
// NewJob management
router.post('/newjobs', adminAuth_1.adminAuth, newJobController_1.createNewJob);
router.put('/newjobs/:id', adminAuth_1.adminAuth, newJobController_1.updateNewJob);
router.delete('/newjobs/:id', adminAuth_1.adminAuth, newJobController_1.deleteNewJob);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map