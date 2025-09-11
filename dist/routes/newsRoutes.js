"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsController_1 = require("../controllers/newsController");
const cache_1 = require("../middleware/cache");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
// Public routes with caching
router.get('/', (0, cache_1.cacheMiddleware)(2 * 60 * 1000), newsController_1.getAllNews); // Cache for 2 minutes
router.get('/:id', (0, cache_1.cacheMiddleware)(5 * 60 * 1000), newsController_1.getNewsById); // Cache for 5 minutes
// Public routes (no authentication required) - Dùng chung cho cả home và admin
// Hỗ trợ upload hình ảnh
router.post('/', (req, res, next) => {
    (0, cache_1.clearCache)('/api/news');
    next();
}, upload_1.uploadSingle, upload_1.handleUploadError, newsController_1.createNews);
router.put('/:id', (req, res, next) => {
    (0, cache_1.clearCache)('/api/news');
    next();
}, upload_1.uploadSingle, upload_1.handleUploadError, newsController_1.updateNews);
router.patch('/:id', (req, res, next) => {
    (0, cache_1.clearCache)('/api/news');
    next();
}, upload_1.uploadSingle, upload_1.handleUploadError, newsController_1.updateNews); // Add PATCH support for partial updates
router.delete('/:id', (req, res, next) => {
    (0, cache_1.clearCache)('/api/news');
    next();
}, newsController_1.deleteNews);
exports.default = router;
//# sourceMappingURL=newsRoutes.js.map