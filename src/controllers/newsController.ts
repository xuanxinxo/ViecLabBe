import { Request, Response } from "express";
import prisma from '../lib/prisma';

// Lấy tất cả tin tức với pagination
export const getAllNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { page = '1', limit, search } = req.query;
    
    const pageNum = parseInt(page as string, 10);
    const limitNum = limit ? parseInt(limit as string, 10) : undefined; // Không giới hạn nếu không có limit
    const skip = limitNum ? (pageNum - 1) * limitNum : 0;
    
    const where: any = {};
    
    // Add search functionality
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { summary: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    
    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        orderBy: {
          date: 'desc'
        },
        skip,
        take: limitNum,
        select: {
          id: true,
          title: true,
          summary: true,
          image: true,
          link: true,
          date: true
        }
      }),
      prisma.news.count({ where })
    ]);
    
    return res.status(200).json({
      success: true,
      data: {
        items: news,
        pagination: {
          page: pageNum,
          limit: limitNum || total, // Hiển thị total nếu không có limit
          total,
          pages: limitNum ? Math.ceil(total / limitNum) : 1
        }
      }
    });
  } catch (error) {
    console.error('Error getting news:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Lỗi server khi lấy danh sách tin tức' 
    });
  }
};

// Tạo tin tức mới
export const createNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, summary, image, link, date } = req.body;

    if (!title || !summary || !link) {
      return res.status(400).json({ 
        success: false,
        error: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc: title, summary, link' 
      });
    }

    // Xử lý hình ảnh - có thể là URL hoặc file đã upload
    let imageUrl = image || null;
    
    // Nếu có file upload, sử dụng URL của file đã upload
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const news = await prisma.news.create({
      data: {
        title,
        summary,
        image: imageUrl,
        link,
        date: date || new Date().toISOString(),
        v: 1,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Tạo tin tức thành công',
      data: news
    });
  } catch (error) {
    console.error('Error creating news:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Lỗi server khi tạo tin tức' 
    });
  }
};

// Lấy chi tiết tin tức
export const getNewsById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const newsItem = await prisma.news.findUnique({
      where: { id },
    });

    if (!newsItem) {
      return res.status(404).json({ 
        success: false,
        error: 'Không tìm thấy tin tức' 
      });
    }

    return res.status(200).json({
      success: true,
      data: newsItem
    });
  } catch (error) {
    console.error('Error getting news:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Lỗi server khi lấy thông tin tin tức' 
    });
  }
};

// Cập nhật tin tức
export const updateNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, summary, image, link, date } = req.body;

    // Xử lý hình ảnh - có thể là URL hoặc file đã upload
    let imageUrl = image;
    
    // Nếu có file upload, sử dụng URL của file đã upload
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title,
        summary,
        image: imageUrl || null,
        link,
        date,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Cập nhật tin tức thành công',
      data: updatedNews
    });
  } catch (error) {
    console.error('Error updating news:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Lỗi server khi cập nhật tin tức' 
    });
  }
};

// Xóa tin tức
export const deleteNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    await prisma.news.delete({
      where: { id },
    });

    return res.status(200).json({ 
      success: true,
      message: 'Xóa tin tức thành công' 
    });
  } catch (error) {
    console.error('Error deleting news:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Lỗi server khi xóa tin tức' 
    });
  }
};
