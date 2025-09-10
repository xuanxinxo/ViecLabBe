import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

export const adminAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Không có quyền truy cập. Vui lòng đăng nhập lại.'
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Token không hợp lệ. Vui lòng đăng nhập lại.'
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    
    try {
      const decoded = jwt.verify(token, jwtSecret) as any;
      
      // Check if user has admin role
      if (decoded.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Không có quyền truy cập. Chỉ admin mới có thể thực hiện thao tác này.'
        });
        return;
      }

      req.user = {
        id: decoded.userId,
        username: decoded.username,
        role: decoded.role
      };

      next();
    } catch (jwtError) {
      res.status(401).json({
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.'
      });
      return;
    }
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi xác thực. Vui lòng thử lại sau.'
    });
  }
};
