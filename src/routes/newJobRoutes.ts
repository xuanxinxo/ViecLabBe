import { Router } from "express";
import {
  getAllNewJobs,
  getNewJobById,
  createNewJob,
  updateNewJob,
  deleteNewJob,
} from "../controllers/newJobController";
import { cacheMiddleware, clearCache } from '../middleware/cache';

const router = Router();

// Public routes with caching
router.get("/", cacheMiddleware(2 * 60 * 1000), getAllNewJobs); // Cache for 2 minutes
router.get("/:id", cacheMiddleware(5 * 60 * 1000), getNewJobById); // Cache for 5 minutes

// Public routes (no authentication required) - Dùng chung cho cả home và admin
router.post("/", (req, res, next) => {
  clearCache('/api/newjobs');
  next();
}, createNewJob);
router.put("/:id", (req, res, next) => {
  clearCache('/api/newjobs');
  next();
}, updateNewJob);
router.patch("/:id", (req, res, next) => {
  clearCache('/api/newjobs');
  next();
}, updateNewJob); // Add PATCH support for partial updates
router.delete("/:id", (req, res, next) => {
  clearCache('/api/newjobs');
  next();
}, deleteNewJob);

export default router;
