import { Router } from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController';
import { cacheMiddleware, clearCache } from '../middleware/cache';

const router = Router();

// Public routes with caching
router.get('/', cacheMiddleware(2 * 60 * 1000), getAllNews); // Cache for 2 minutes
router.get('/:id', cacheMiddleware(5 * 60 * 1000), getNewsById); // Cache for 5 minutes

// Public routes (no authentication required) - Dùng chung cho cả home và admin
router.post('/', (req, res, next) => {
  clearCache('/api/news');
  next();
}, createNews);
router.put('/:id', (req, res, next) => {
  clearCache('/api/news');
  next();
}, updateNews);
router.patch('/:id', (req, res, next) => {
  clearCache('/api/news');
  next();
}, updateNews); // Add PATCH support for partial updates
router.delete('/:id', (req, res, next) => {
  clearCache('/api/news');
  next();
}, deleteNews);

export default router;
