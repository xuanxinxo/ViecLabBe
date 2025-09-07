"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicationController_1 = require("../controllers/applicationController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public routes (no auth required)
router.post('/', applicationController_1.createApplication);
router.get('/', applicationController_1.getApplications); // Public list for homepage widgets
// Protected routes (require authentication)
router.get('/my-applications', auth_1.auth, applicationController_1.getMyApplications);
router.get('/:id', auth_1.auth, applicationController_1.getApplicationById);
router.put('/:id', auth_1.auth, applicationController_1.updateApplication);
router.delete('/:id', auth_1.auth, applicationController_1.deleteApplication);
exports.default = router;
//# sourceMappingURL=applicationRoutes.js.map