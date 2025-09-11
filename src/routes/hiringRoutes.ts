import { Router } from 'express';
import {
  getHirings,
  getHiringById,
  createHiring,
  updateHiring,
  deleteHiring,
} from '../controllers/hiringController';
import { cacheMiddleware, clearCache } from '../middleware/cache';
import { uploadSingle, handleUploadError } from '../middleware/upload';

const router = Router();

// Public routes with caching
router.get('/', cacheMiddleware(2 * 60 * 1000), getHirings); // Cache for 2 minutes
router.get('/:id', cacheMiddleware(5 * 60 * 1000), getHiringById); // Cache for 5 minutes

// Public routes (no authentication required) - Dùng chung cho cả home và admin
// Hỗ trợ upload hình ảnh
router.post('/', (req: any, res: any, next: any) => {
  clearCache('/api/hirings');
  next();
}, uploadSingle, handleUploadError, createHiring);
router.put('/:id', (req: any, res: any, next: any) => {
  clearCache('/api/hirings');
  next();
}, uploadSingle, handleUploadError, updateHiring);
router.patch('/:id', (req: any, res: any, next: any) => {
  clearCache('/api/hirings');
  next();
}, uploadSingle, handleUploadError, updateHiring); // Add PATCH support for partial updates
router.delete('/:id', (req: any, res: any, next: any) => {
  clearCache('/api/hirings');
  next();
}, deleteHiring);

export default router;
