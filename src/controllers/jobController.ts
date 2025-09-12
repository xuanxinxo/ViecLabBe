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
      limit,
      search
    } = req.query;
    console.log("get jobs", req.query);
    const pageNum = parseInt(page as string, 10);
    const limitNum = limit ? parseInt(limit as string, 10) : undefined; // Không giới hạn nếu không có limit
    const skip = limitNum ? (pageNum - 1) * limitNum : 0;

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
          limit: limitNum || total, // Hiển thị total nếu không có limit
          total,
          pages: limitNum ? Math.ceil(total / limitNum) : 1
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
    console.log("create", req.body);
    if (!title || !company || !location || !type || !salary || !description || !deadline) {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc: title, company, location, type, salary, description, deadline',
      });
    }

    // Validate deadline
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Định dạng deadline không hợp lệ'
      });
    }

    // Xử lý hình ảnh - có thể là URL hoặc file đã upload
    let imageUrl = img || null;

    // Nếu có file upload, sử dụng URL của file đã upload
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
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
        deadline: deadlineDate,
        postedDate: new Date(),
        img: imageUrl,
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

    // Xử lý hình ảnh - có thể là URL hoặc file đã upload
    let imageUrl = img;

    // Nếu có file upload, sử dụng URL của file đã upload
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

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
        img: imageUrl,
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
