import { Request, Response } from "express";
import prisma from '../lib/prisma';

// Lấy tất cả NewJob với pagination
export const getAllNewJobs = async (req: Request, res: Response) => {
  try {
    const { 
      page = '1', 
      limit = '10', 
      search,
      type,
      location 
    } = req.query;
    
    const pageNum = parseInt(page as string, 10);
    const limitNum = Math.min(parseInt(limit as string, 10), 50);
    const skip = (pageNum - 1) * limitNum;
    
    const where: any = {};
    
    if (type) where.type = type;
    if (location) where.location = { contains: location as string, mode: 'insensitive' };
    
    // Add search functionality
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { company: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    
    const [jobs, total] = await Promise.all([
      prisma.newJob.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
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
          createdAt: true,
          img: true
        }
      }),
      prisma.newJob.count({ where })
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
    console.error('Error fetching new jobs:', error);
    return res.status(500).json({ 
      success: false,
      error: "Lỗi server khi lấy danh sách new jobs"
    });
  }
};

// Lấy NewJob theo id
export const getNewJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Job ID is required"
      });
    }

    const job = await prisma.newJob.findUnique({
      where: { id },
    });
    
    if (!job) {
      return res.status(404).json({
        success: false,
        error: "Không tìm thấy job"
      });
    }
    
    return res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error getting new job:', error);
    return res.status(500).json({
      success: false,
      error: "Lỗi server khi lấy thông tin job"
    });
  }
};
// Tạo NewJob mới
export const createNewJob = async (req: Request, res: Response) => {
  try {
    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements = [],
      benefits = [],
      deadline,
      isRemote = false,
      tags = [],
      img,
      status = 'active'
    } = req.body;

    // Validation
    if (!title || !company || !location || !type || !salary || !description || !deadline) {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc'
      });
    }

    const job = await prisma.newJob.create({
      data: {
        title,
        company,
        location,
        type,
        salary,
        description,
        requirements,
        benefits,
        deadline: new Date(deadline),
        isRemote: Boolean(isRemote),
        tags,
        img: img || null,
        status,
        postedDate: new Date(),
        createdAt: new Date()
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Tạo new job thành công',
      data: job
    });
  } catch (error) {
    console.error('Error creating new job:', error);
    return res.status(500).json({
      success: false,
      error: "Lỗi server khi tạo new job"
    });
  }
};

// Cập nhật NewJob
export const updateNewJob = async (req: Request, res: Response) => {
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

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Job ID is required"
      });
    }

    // Check if job exists
    const existingJob = await prisma.newJob.findUnique({
      where: { id },
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        error: "Job không tồn tại"
      });
    }

    const job = await prisma.newJob.update({
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
        deadline: deadline ? new Date(deadline) : undefined,
        isRemote,
        tags,
        status,
        img,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Cập nhật new job thành công',
      data: job
    });
  } catch (error) {
    console.error('Error updating new job:', error);
    return res.status(500).json({
      success: false,
      error: "Lỗi server khi cập nhật new job"
    });
  }
};

// Xóa NewJob
export const deleteNewJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Job ID is required"
      });
    }

    // Check if job exists
    const existingJob = await prisma.newJob.findUnique({
      where: { id },
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        error: "Job không tồn tại"
      });
    }

    await prisma.newJob.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Xóa new job thành công"
    });
  } catch (error) {
    console.error('Error deleting new job:', error);
    return res.status(500).json({
      success: false,
      error: "Lỗi server khi xóa new job"
    });
  }
};
