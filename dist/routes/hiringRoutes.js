"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hiringController_1 = require("../controllers/hiringController");
const router = (0, express_1.Router)();
// Public routes
router.get('/', hiringController_1.getHirings);
router.get('/:id', hiringController_1.getHiringById);
// Public routes (no authentication required)
router.post('/', hiringController_1.createHiring);
router.put('/:id', hiringController_1.updateHiring);
router.delete('/:id', hiringController_1.deleteHiring);
exports.default = router;
//# sourceMappingURL=hiringRoutes.js.map