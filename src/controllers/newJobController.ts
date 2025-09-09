import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Lấy tất cả NewJob
export const getAllNewJobs = async (_req: Request, res: Response) => {
  try {
    const jobs = await prisma.newJob.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
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
        img: img || '',
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
    const updateData = req.body;

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

    // Handle date fields
    if (updateData.deadline) {
      updateData.deadline = new Date(updateData.deadline);
    }

    const job = await prisma.newJob.update({
      where: { id },
      data: updateData,
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
