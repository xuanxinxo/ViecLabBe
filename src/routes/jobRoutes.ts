import { Router } from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController';
import { cacheMiddleware, clearCache } from '../middleware/cache';
import { uploadSingle, handleUploadError } from '../middleware/upload';

const router = Router();
console.log("run job routes");
// Public routes with caching
router.get('/', cacheMiddleware(2 * 60 * 1000), getJobs); // Cache for 2 minutes
// router.get('/', () => console.log("error"));
router.get('/:id', cacheMiddleware(5 * 60 * 1000), getJobById); // Cache for 5 minutes

// Public routes (no authentication required) - Dùng chung cho cả home và admin
// Hỗ trợ upload hình ảnh
router.post('/', (req: any, res: any, next: any) => {
  clearCache('/api/jobs');
  next();
}, uploadSingle, handleUploadError, createJob);
router.put('/:id', (req: any, res: any, next: any) => {
  clearCache('/api/jobs');
  next();
}, uploadSingle, handleUploadError, updateJob);
router.patch('/:id', (req: any, res: any, next: any) => {
  clearCache('/api/jobs');
  next();
}, uploadSingle, handleUploadError, updateJob); // Add PATCH support for partial updates
router.delete('/:id', (req: any, res: any, next: any) => {
  clearCache('/api/jobs');
  next();
}, deleteJob);

export default router;
