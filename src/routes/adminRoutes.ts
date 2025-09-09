import { Router } from 'express';
import { adminLogin } from '../controllers/adminController';

const router = Router();

// Admin login endpoint
router.post('/login', adminLogin);

export default router;
