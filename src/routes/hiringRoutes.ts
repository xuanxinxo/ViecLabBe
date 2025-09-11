import { Router } from 'express';
import {
  getHirings,
  getHiringById,
  createHiring,
  updateHiring,
  deleteHiring,
} from '../controllers/hiringController';

const router = Router();

// Public routes
router.get('/', getHirings);
router.get('/:id', getHiringById);

// Public routes (no authentication required)
router.post('/', createHiring);
router.put('/:id', updateHiring);
router.delete('/:id', deleteHiring);

export default router;
