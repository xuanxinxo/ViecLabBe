"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hiringController_js_1 = require("../controllers/hiringController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Public routes
router.get('/', hiringController_js_1.getHirings);
router.get('/:id', hiringController_js_1.getHiringById);
// Protected routes (require authentication)
router.post('/', auth_js_1.auth, hiringController_js_1.createHiring);
router.put('/:id', auth_js_1.auth, hiringController_js_1.updateHiring);
router.delete('/:id', auth_js_1.auth, hiringController_js_1.deleteHiring);
exports.default = router;
//# sourceMappingURL=hiringRoutes.js.map