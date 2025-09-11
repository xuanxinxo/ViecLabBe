import { Router } from 'express';
import { uploadImage, uploadImages, uploadMiddleware } from '../controllers/uploadController';
import { uploadMultiple, handleUploadError } from '../middleware/upload';

const router = Router();

// Upload single image
router.post('/single', uploadMiddleware, uploadImage);

// Upload multiple images
router.post('/multiple', [uploadMultiple, handleUploadError], uploadImages);

export default router;
