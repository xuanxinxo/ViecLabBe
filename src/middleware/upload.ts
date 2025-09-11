import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Cấu hình storage cho multer
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Tạo tên file unique với timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filter để chỉ cho phép upload hình ảnh
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Kiểm tra file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép upload file hình ảnh!'));
  }
};

// Cấu hình multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
  }
});

// Middleware upload single file
export const uploadSingle = upload.single('image');

// Middleware upload multiple files
export const uploadMultiple = upload.array('images', 5);

// Middleware xử lý lỗi upload
export const handleUploadError = (error: any, req: Request, res: any, next: any) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File quá lớn! Kích thước tối đa là 5MB.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Quá nhiều file! Tối đa 5 file.'
      });
    }
  }
  
  if (error.message === 'Chỉ cho phép upload file hình ảnh!') {
    return res.status(400).json({
      success: false,
      error: 'Chỉ cho phép upload file hình ảnh!'
    });
  }
  
  next(error);
};

export default upload;
