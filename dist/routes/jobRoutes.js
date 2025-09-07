"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_1 = require("../controllers/jobController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public routes
router.get('/', jobController_1.getJobs);
router.get('/:id', jobController_1.getJobById);
// Protected routes (require authentication)
router.post('/', auth_1.auth, jobController_1.createJob);
router.put('/:id', auth_1.auth, jobController_1.updateJob);
router.patch('/:id', auth_1.auth, jobController_1.updateJob); // Add PATCH support for partial updates
router.delete('/:id', auth_1.auth, jobController_1.deleteJob);
exports.default = router;
//# sourceMappingURL=jobRoutes.js.map