import { Router } from "express";
import {
  getAllNewJobs,
  getNewJobById,
  createNewJob,
  updateNewJob,
  deleteNewJob,
} from "../controllers/newJobController";
import { cacheMiddleware, clearCache } from '../middleware/cache';
import { uploadSingle, handleUploadError } from '../middleware/upload';

const router = Router();

// Public routes with caching
router.get("/", cacheMiddleware(2 * 60 * 1000), getAllNewJobs); // Cache for 2 minutes
router.get("/:id", cacheMiddleware(5 * 60 * 1000), getNewJobById); // Cache for 5 minutes

// Public routes (no authentication required) - Dùng chung cho cả home và admin
// Hỗ trợ upload hình ảnh
router.post("/", (req: any, res: any, next: any) => {
  clearCache('/api/newjobs');
  next();
}, uploadSingle, handleUploadError, createNewJob);
router.put("/:id", (req: any, res: any, next: any) => {
  clearCache('/api/newjobs');
  next();
}, uploadSingle, handleUploadError, updateNewJob);
router.patch("/:id", (req: any, res: any, next: any) => {
  clearCache('/api/newjobs');
  next();
}, uploadSingle, handleUploadError, updateNewJob); // Add PATCH support for partial updates
router.delete("/:id", (req, res, next) => {
  clearCache('/api/newjobs');
  next();
}, deleteNewJob);

export default router;
