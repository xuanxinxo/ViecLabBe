"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploadError = exports.uploadMultiple = exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Cấu hình storage cho multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Tạo tên file unique với timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
// Filter để chỉ cho phép upload hình ảnh
const fileFilter = (req, file, cb) => {
    // Kiểm tra file type
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Chỉ cho phép upload file hình ảnh!'));
    }
};
// Cấu hình multer
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
    }
});
// Middleware upload single file
exports.uploadSingle = upload.single('image');
// Middleware upload multiple files
exports.uploadMultiple = upload.array('images', 5);
// Middleware xử lý lỗi upload
const handleUploadError = (error, req, res, next) => {
    if (error instanceof multer_1.default.MulterError) {
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
exports.handleUploadError = handleUploadError;
exports.default = upload;
//# sourceMappingURL=upload.js.map