"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsController_1 = require("../controllers/newsController");
const router = (0, express_1.Router)();
// Public routes
router.get('/', newsController_1.getAllNews);
router.get('/:id', newsController_1.getNewsById);
// Public routes (no authentication required)
router.post('/', newsController_1.createNews);
router.put('/:id', newsController_1.updateNews);
router.delete('/:id', newsController_1.deleteNews);
exports.default = router;
//# sourceMappingURL=newsRoutes.js.map