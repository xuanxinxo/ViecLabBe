import { Request, Response } from "express";
import prisma from '../lib/prisma';

// Lấy tất cả jobs với pagination
export const getJobs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { 
      status, 
      type, 
      location, 
      isRemote, 
      page = '1', 
      limit = '10',
      search 
    } = req.query;
    
    const pageNum = parseInt(page as string, 10);
    const limitNum = Math.min(parseInt(limit as string, 10), 50); // Max 50 items per page
    const skip = (pageNum - 1) * limitNum;
    
    const where: any = {};
    
    if (status) where.status = status;
    if (type) where.type = type;
    if (location) where.location = { contains: location as string, mode: 'insensitive' };
    if (isRemote !== undefined) where.isRemote = isRemote === 'true';
    
    // Add search functionality
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { company: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    
    // Use Promise.all for parallel queries
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: {
          postedDate: 'desc',
        },
        skip,
        take: limitNum,
        select: {
          id: true,
          title: true,
          company: true,
          location: true,
          type: true,
          salary: true,
          description: true,
          requirements: true,
          benefits: true,
          deadline: true,
          isRemote: true,
          tags: true,
          status: true,
          postedDate: true,
          img: true
        }
      }),
      prisma.job.count({ where })
    ]);
    
    return res.status(200).json({
      success: true,
      data: {
        items: jobs,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('Error getting jobs:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Lỗi server khi lấy danh sách công việc' 
    });
  }
};

// Lấy chi tiết job
export const getJobById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    
    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Không tìm thấy công việc',
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Error getting job:', error);
    return res.status(500).json({
      success: false,
      error: 'Lỗi server khi lấy thông tin công việc',
    });
  }
};

// Tạo job mới
export const createJob = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements,
      benefits,
      deadline,
      isRemote = false,
      tags = [],
      img,
    } = req.body;

    if (!title || !company || !location || !type || !salary || !description) {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc',
      });
    }

    const createdJob = await prisma.job.create({
      data: {
        title,
        company,
        location,
        type,
        salary,
        description,
        requirements: requirements || [],
        benefits: benefits || [],
        tags: tags || [],
        isRemote: Boolean(isRemote),
        status: 'active',
        deadline: new Date(deadline),
        postedDate: new Date(),
        img: img || null,
      },
    });

    return res.status(201).json({
      success: true,
      data: createdJob,
    });
  } catch (error) {
    console.error('Error creating job:', error);
    return res.status(500).json({
      success: false,
      error: 'Lỗi server khi tạo công việc mới',
    });
  }
};

// Xóa job
export const deleteJob = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    await prisma.job.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      data: {},
      message: 'Xóa công việc thành công',
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    return res.status(500).json({
      success: false,
      error: 'Lỗi server khi xóa công việc',
    });
  }
};
// ...existing code...

// Cập nhật job
export const updateJob = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements,
      benefits,
      deadline,
      isRemote,
      tags,
      status,
      img,
    } = req.body;

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        title,
        company,
        location,
        type,
        salary,
        description,
        requirements,
        benefits,
        tags,
        isRemote,
        status,
        img,
        deadline: deadline ? new Date(deadline) : undefined,
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedJob,
    });
  } catch (error) {
    console.error('Error updating job:', error);
    return res.status(500).json({
      success: false,
      error: 'Lỗi server khi cập nhật công việc',
    });
  }
};
// ...existing code...
