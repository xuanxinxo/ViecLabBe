import { Router } from 'express';
import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
  getMyApplications,
} from '../controllers/applicationController';
import { auth } from '../middleware/auth';

const router = Router();

// Public routes (no auth required)
router.post('/', createApplication);
router.get('/', getApplications); // Public list for homepage widgets

// Protected routes (require authentication)
router.get('/my-applications', auth, getMyApplications);
router.get('/:id', auth, getApplicationById);
router.put('/:id', auth, updateApplication);
router.delete('/:id', auth, deleteApplication);

export default router;
