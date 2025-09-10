import { Router } from 'express';
import { 
  getJobs, 
  getJobById, 
  createJob, 
  updateJob, 
  deleteJob 
} from '../controllers/jobController';
import { auth } from '../middleware/auth';
import { cacheMiddleware, clearCache } from '../middleware/cache';

const router = Router();

// Public routes with caching
router.get('/', cacheMiddleware(2 * 60 * 1000), getJobs); // Cache for 2 minutes
router.get('/:id', cacheMiddleware(5 * 60 * 1000), getJobById); // Cache for 5 minutes

// Protected routes (require authentication)
router.post('/', auth, (req, res, next) => {
  clearCache('/api/jobs');
  next();
}, createJob);
router.put('/:id', auth, (req, res, next) => {
  clearCache('/api/jobs');
  next();
}, updateJob);
router.patch('/:id', auth, (req, res, next) => {
  clearCache('/api/jobs');
  next();
}, updateJob); // Add PATCH support for partial updates
router.delete('/:id', auth, (req, res, next) => {
  clearCache('/api/jobs');
  next();
}, deleteJob);

export default router;
