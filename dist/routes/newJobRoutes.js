"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newJobController_1 = require("../controllers/newJobController");
const cache_1 = require("../middleware/cache");
const router = (0, express_1.Router)();
// Public routes with caching
router.get("/", (0, cache_1.cacheMiddleware)(2 * 60 * 1000), newJobController_1.getAllNewJobs); // Cache for 2 minutes
router.get("/:id", (0, cache_1.cacheMiddleware)(5 * 60 * 1000), newJobController_1.getNewJobById); // Cache for 5 minutes
// Public routes (no authentication required) - Dùng chung cho cả home và admin
router.post("/", (req, res, next) => {
    (0, cache_1.clearCache)('/api/newjobs');
    next();
}, newJobController_1.createNewJob);
router.put("/:id", (req, res, next) => {
    (0, cache_1.clearCache)('/api/newjobs');
    next();
}, newJobController_1.updateNewJob);
router.patch("/:id", (req, res, next) => {
    (0, cache_1.clearCache)('/api/newjobs');
    next();
}, newJobController_1.updateNewJob); // Add PATCH support for partial updates
router.delete("/:id", (req, res, next) => {
    (0, cache_1.clearCache)('/api/newjobs');
    next();
}, newJobController_1.deleteNewJob);
exports.default = router;
//# sourceMappingURL=newJobRoutes.js.map