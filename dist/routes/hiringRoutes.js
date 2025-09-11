"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hiringController_1 = require("../controllers/hiringController");
const cache_1 = require("../middleware/cache");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
// Public routes with caching
router.get('/', (0, cache_1.cacheMiddleware)(2 * 60 * 1000), hiringController_1.getHirings); // Cache for 2 minutes
router.get('/:id', (0, cache_1.cacheMiddleware)(5 * 60 * 1000), hiringController_1.getHiringById); // Cache for 5 minutes
// Public routes (no authentication required) - Dùng chung cho cả home và admin
// Hỗ trợ upload hình ảnh
router.post('/', (req, res, next) => {
    (0, cache_1.clearCache)('/api/hirings');
    next();
}, upload_1.uploadSingle, upload_1.handleUploadError, hiringController_1.createHiring);
router.put('/:id', (req, res, next) => {
    (0, cache_1.clearCache)('/api/hirings');
    next();
}, upload_1.uploadSingle, upload_1.handleUploadError, hiringController_1.updateHiring);
router.patch('/:id', (req, res, next) => {
    (0, cache_1.clearCache)('/api/hirings');
    next();
}, upload_1.uploadSingle, upload_1.handleUploadError, hiringController_1.updateHiring); // Add PATCH support for partial updates
router.delete('/:id', (req, res, next) => {
    (0, cache_1.clearCache)('/api/hirings');
    next();
}, hiringController_1.deleteHiring);
exports.default = router;
//# sourceMappingURL=hiringRoutes.js.map