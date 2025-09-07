"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsController_js_1 = require("../controllers/newsController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Public routes
router.get('/', newsController_js_1.getAllNews);
router.get('/:id', newsController_js_1.getNewsById);
// Protected routes (require authentication)
router.post('/', auth_js_1.auth, newsController_js_1.createNews);
router.put('/:id', auth_js_1.auth, newsController_js_1.updateNews);
router.delete('/:id', auth_js_1.auth, newsController_js_1.deleteNews);
exports.default = router;
//# sourceMappingURL=newsRoutes.js.map