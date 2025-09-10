"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_1 = require("../controllers/jobController");
const auth_1 = require("../middleware/auth");
const cache_1 = require("../middleware/cache");
const router = (0, express_1.Router)();
// Public routes with caching
router.get('/', (0, cache_1.cacheMiddleware)(2 * 60 * 1000), jobController_1.getJobs); // Cache for 2 minutes
router.get('/:id', (0, cache_1.cacheMiddleware)(5 * 60 * 1000), jobController_1.getJobById); // Cache for 5 minutes
// Protected routes (require authentication)
router.post('/', auth_1.auth, (req, res, next) => {
    (0, cache_1.clearCache)('/api/jobs');
    next();
}, jobController_1.createJob);
router.put('/:id', auth_1.auth, (req, res, next) => {
    (0, cache_1.clearCache)('/api/jobs');
    next();
}, jobController_1.updateJob);
router.patch('/:id', auth_1.auth, (req, res, next) => {
    (0, cache_1.clearCache)('/api/jobs');
    next();
}, jobController_1.updateJob); // Add PATCH support for partial updates
router.delete('/:id', auth_1.auth, (req, res, next) => {
    (0, cache_1.clearCache)('/api/jobs');
    next();
}, jobController_1.deleteJob);
exports.default = router;
//# sourceMappingURL=jobRoutes.js.map