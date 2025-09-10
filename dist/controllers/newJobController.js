"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewJob = exports.updateNewJob = exports.createNewJob = exports.getNewJobById = exports.getAllNewJobs = void 0;
// import { PrismaClient } from "@prisma/client";
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Lấy tất cả NewJob với pagination
const getAllNewJobs = async (req, res) => {
    try {
        const { page = '1', limit = '10', search, type, location } = req.query;
        const pageNum = parseInt(page, 10);
        const limitNum = Math.min(parseInt(limit, 10), 50);
        const skip = (pageNum - 1) * limitNum;
        const where = {};
        if (type)
            where.type = type;
        if (location)
            where.location = { contains: location, mode: 'insensitive' };
        // Add search functionality
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { company: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
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
    }
    catch (error) {
        console.error('Error fetching new jobs:', error);
        return res.status(500).json({
            success: false,
            error: "Lỗi server khi lấy danh sách new jobs"
        });
    }
};
exports.getAllNewJobs = getAllNewJobs;
// Lấy NewJob theo id
const getNewJobById = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error getting new job:', error);
        return res.status(500).json({
            success: false,
            error: "Lỗi server khi lấy thông tin job"
        });
    }
};
exports.getNewJobById = getNewJobById;
// Tạo NewJob mới
const createNewJob = async (req, res) => {
    try {
        const { title, company, location, type, salary, description, requirements = [], benefits = [], deadline, isRemote = false, tags = [], img, status = 'active' } = req.body;
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
    }
    catch (error) {
        console.error('Error creating new job:', error);
        return res.status(500).json({
            success: false,
            error: "Lỗi server khi tạo new job"
        });
    }
};
exports.createNewJob = createNewJob;
// Cập nhật NewJob
const updateNewJob = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error updating new job:', error);
        return res.status(500).json({
            success: false,
            error: "Lỗi server khi cập nhật new job"
        });
    }
};
exports.updateNewJob = updateNewJob;
// Xóa NewJob
const deleteNewJob = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error deleting new job:', error);
        return res.status(500).json({
            success: false,
            error: "Lỗi server khi xóa new job"
        });
    }
};
exports.deleteNewJob = deleteNewJob;
//# sourceMappingURL=newJobController.js.map