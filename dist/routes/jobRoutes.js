"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_js_1 = require("../controllers/jobController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Public routes
router.get('/', jobController_js_1.getJobs);
router.get('/:id', jobController_js_1.getJobById);
// Protected routes (require authentication)
router.post('/', auth_js_1.auth, jobController_js_1.createJob);
router.put('/:id', auth_js_1.auth, jobController_js_1.updateJob);
router.patch('/:id', auth_js_1.auth, jobController_js_1.updateJob); // Add PATCH support for partial updates
router.delete('/:id', auth_js_1.auth, jobController_js_1.deleteJob);
exports.default = router;
//# sourceMappingURL=jobRoutes.js.map