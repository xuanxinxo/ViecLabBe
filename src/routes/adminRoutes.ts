import { Router } from 'express';
import { adminLogin } from '../controllers/adminController';
import { adminAuth } from '../middleware/adminAuth';

// Import CRUD functions from controllers
import { 
  createJob, 
  updateJob, 
  deleteJob 
} from '../controllers/jobController';

import { 
  createNews, 
  updateNews, 
  deleteNews 
} from '../controllers/newsController';

import { 
  createHiring, 
  updateHiring, 
  deleteHiring 
} from '../controllers/hiringController';

import { 
  createNewJob, 
  updateNewJob, 
  deleteNewJob 
} from '../controllers/newJobController';

const router = Router();

// Admin login endpoint
router.post('/login', adminLogin);

// Job management
router.post('/jobs', adminAuth, createJob);
router.put('/jobs/:id', adminAuth, updateJob);
router.delete('/jobs/:id', adminAuth, deleteJob);

// News management
router.post('/news', adminAuth, createNews);
router.put('/news/:id', adminAuth, updateNews);
router.delete('/news/:id', adminAuth, deleteNews);

// Hiring management
router.post('/hirings', adminAuth, createHiring);
router.put('/hirings/:id', adminAuth, updateHiring);
router.delete('/hirings/:id', adminAuth, deleteHiring);

// NewJob management
router.post('/newjobs', adminAuth, createNewJob);
router.put('/newjobs/:id', adminAuth, updateNewJob);
router.delete('/newjobs/:id', adminAuth, deleteNewJob);

export default router;


