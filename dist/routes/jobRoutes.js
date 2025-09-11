"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_1 = require("../controllers/jobController");
const cache_1 = require("../middleware/cache");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
// Public routes with caching
router.get('/', (0, cache_1.cacheMiddleware)(2 * 60 * 1000), jobController_1.getJobs); // Cache for 2 minutes
router.get('/:id', (0, cache_1.cacheMiddleware)(5 * 60 * 1000), jobController_1.getJobById); // Cache for 5 minutes
// Public routes (no authentication required) - Dùng chung cho cả home và admin
// Hỗ trợ upload hình ảnh
router.post('/', (req, res, next) => {
    (0, cache_1.clearCache)('/api/jobs');
    next();
}, upload_1.uploadSingle, upload_1.handleUploadError, jobController_1.createJob);
router.put('/:id', (req, res, next) => {
    (0, cache_1.clearCache)('/api/jobs');
    next();
}, upload_1.uploadSingle, upload_1.handleUploadError, jobController_1.updateJob);
router.patch('/:id', (req, res, next) => {
    (0, cache_1.clearCache)('/api/jobs');
    next();
}, upload_1.uploadSingle, upload_1.handleUploadError, jobController_1.updateJob); // Add PATCH support for partial updates
router.delete('/:id', (req, res, next) => {
    (0, cache_1.clearCache)('/api/jobs');
    next();
}, jobController_1.deleteJob);
exports.default = router;
//# sourceMappingURL=jobRoutes.js.map