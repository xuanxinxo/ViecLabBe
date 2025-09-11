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
      error: 'Failed to get news' 
    });
  }
};

// Tạo tin tức mới
export const createNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, summary, image, link, date } = req.body;

    if (!title || !summary || !link) {
      return res.status(400).json({ error: 'Title, summary and link are required' });
    }

    const news = await prisma.news.create({
      data: {
        title,
        summary,
        image: image || null,
        link,
        date: date || new Date().toISOString(),
        v: 1,
      },
    });

    return res.status(201).json(news);
  } catch (error) {
    console.error('Error creating news:', error);
    return res.status(500).json({ error: 'Failed to create news' });
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
      return res.status(404).json({ error: 'News not found' });
    }

    return res.status(200).json(newsItem);
  } catch (error) {
    console.error('Error getting news:', error);
    return res.status(500).json({ error: 'Failed to get news' });
  }
};

// Cập nhật tin tức
export const updateNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, summary, image, link, date } = req.body;

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title,
        summary,
        image: image || null,
        link,
        date,
      },
    });

    return res.status(200).json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    return res.status(500).json({ error: 'Failed to update news' });
  }
};

// Xóa tin tức
export const deleteNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    await prisma.news.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return res.status(500).json({ error: 'Failed to delete news' });
  }
};
