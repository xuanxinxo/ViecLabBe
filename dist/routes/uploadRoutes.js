"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadController_1 = require("../controllers/uploadController");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
// Upload single image
router.post('/single', uploadController_1.uploadMiddleware, uploadController_1.uploadImage);
// Upload multiple images
router.post('/multiple', [upload_1.uploadMultiple, upload_1.handleUploadError], uploadController_1.uploadImages);
exports.default = router;
//# sourceMappingURL=uploadRoutes.js.map