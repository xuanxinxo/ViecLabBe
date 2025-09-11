import { Router } from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController';

const router = Router();

// Public routes
router.get('/', getAllNews);
router.get('/:id', getNewsById);

// Public routes (no authentication required)
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

export default router;
