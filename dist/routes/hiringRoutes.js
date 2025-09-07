"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hiringController_1 = require("../controllers/hiringController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public routes
router.get('/', hiringController_1.getHirings);
router.get('/:id', hiringController_1.getHiringById);
// Protected routes (require authentication)
router.post('/', auth_1.auth, hiringController_1.createHiring);
router.put('/:id', auth_1.auth, hiringController_1.updateHiring);
router.delete('/:id', auth_1.auth, hiringController_1.deleteHiring);
exports.default = router;
//# sourceMappingURL=hiringRoutes.js.map