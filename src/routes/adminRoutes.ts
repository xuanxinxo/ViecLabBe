import { Router } from 'express';
import { 
  adminLogin, 
  getAdminProfile,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  updateJobStatus,
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getDashboardStats,
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  getAllHirings,
  createHiring,
  updateHiring,
  deleteHiring,
  getAllNewJobs,
  createNewJob,
  updateNewJob,
  deleteNewJob,
  getSystemSettings,
  updateSystemSettings
} from '../controllers/adminController';
import { authLimiter } from '../middleware/rateLimit';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// Apply rate limiting to all admin auth endpoints (temporarily disabled for testing)
// router.use(authLimiter);

// Admin authentication
router.post('/login', adminLogin);
router.get('/profile', adminAuth, getAdminProfile);

// Dashboard
router.get('/dashboard', adminAuth, getDashboardStats);

// User management
router.get('/users', adminAuth, getAllUsers);
router.get('/users/:id', adminAuth, getUserById);
router.put('/users/:id/role', adminAuth, updateUserRole);
router.delete('/users/:id', adminAuth, deleteUser);

// Job management
router.get('/jobs', adminAuth, getAllJobs);
router.post('/jobs', adminAuth, createJob);
router.put('/jobs/:id', adminAuth, updateJob);
router.delete('/jobs/:id', adminAuth, deleteJob);
router.put('/jobs/:id/status', adminAuth, updateJobStatus);

// Application management
router.get('/applications', adminAuth, getAllApplications);
router.post('/applications', adminAuth, createApplication);
router.put('/applications/:id', adminAuth, updateApplication);
router.delete('/applications/:id', adminAuth, deleteApplication);

// News management
router.get('/news', adminAuth, getAllNews);
router.post('/news', adminAuth, createNews);
router.put('/news/:id', adminAuth, updateNews);
router.delete('/news/:id', adminAuth, deleteNews);

// Hiring management
router.get('/hirings', adminAuth, getAllHirings);
router.post('/hirings', adminAuth, createHiring);
router.put('/hirings/:id', adminAuth, updateHiring);
router.delete('/hirings/:id', adminAuth, deleteHiring);

// NewJobs management
router.get('/newjobs', adminAuth, getAllNewJobs);
router.post('/newjobs', adminAuth, createNewJob);
router.put('/newjobs/:id', adminAuth, updateNewJob);
router.delete('/newjobs/:id', adminAuth, deleteNewJob);

// System settings
router.get('/settings', adminAuth, getSystemSettings);
router.put('/settings', adminAuth, updateSystemSettings);

export default router;
