import { Request, Response } from 'express';
import { uploadSingle, handleUploadError } from '../middleware/upload';

// Upload single image
export const uploadImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Kiểm tra xem có file được upload không
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Không có file được upload'
      });
    }

    // Tạo URL để truy cập file
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: 'Upload hình ảnh thành công',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: imageUrl
      }
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({
      success: false,
      error: 'Lỗi server khi upload hình ảnh'
    });
  }
};

// Upload multiple images
export const uploadImages = async (req: Request, res: Response): Promise<Response> => {
  try {
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Không có file được upload'
      });
    }

    const uploadedFiles = files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
    }));

    return res.status(200).json({
      success: true,
      message: 'Upload hình ảnh thành công',
      data: uploadedFiles
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    return res.status(500).json({
      success: false,
      error: 'Lỗi server khi upload hình ảnh'
    });
  }
};

// Middleware để xử lý upload
export const uploadMiddleware = [uploadSingle, handleUploadError];
