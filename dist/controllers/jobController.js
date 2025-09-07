"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJob = exports.deleteJob = exports.createJob = exports.getJobById = exports.getJobs = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// Lấy tất cả jobs
const getJobs = async (req, res) => {
    try {
        const { status, type, location, isRemote } = req.query;
        const where = {};
        if (status)
            where.status = status;
        if (type)
            where.type = type;
        if (location)
            where.location = { contains: location, mode: 'insensitive' };
        if (isRemote !== undefined)
            where.isRemote = isRemote === 'true';
        const jobs = await prisma_1.default.job.findMany({
            where,
            orderBy: {
                postedDate: 'desc',
            },
        });
        return res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs,
        });
    }
    catch (error) {
        console.error('Error getting jobs:', error);
        return res.status(500).json({
            success: false,
            error: 'Lỗi server khi lấy danh sách công việc'
        });
    }
};
exports.getJobs = getJobs;
// Lấy chi tiết job
const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await prisma_1.default.job.findUnique({
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
    }
    catch (error) {
        console.error('Error getting job:', error);
        return res.status(500).json({
            success: false,
            error: 'Lỗi server khi lấy thông tin công việc',
        });
    }
};
exports.getJobById = getJobById;
// Tạo job mới
const createJob = async (req, res) => {
    try {
        const { title, company, location, type, salary, description, requirements, benefits, deadline, isRemote = false, tags = [], } = req.body;
        if (!title || !company || !location || !type || !salary || !description) {
            return res.status(400).json({
                success: false,
                error: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc',
            });
        }
        const createdJob = await prisma_1.default.job.create({
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
            },
        });
        return res.status(201).json({
            success: true,
            data: createdJob,
        });
    }
    catch (error) {
        console.error('Error creating job:', error);
        return res.status(500).json({
            success: false,
            error: 'Lỗi server khi tạo công việc mới',
        });
    }
};
exports.createJob = createJob;
// Xóa job
const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.job.delete({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            data: {},
            message: 'Xóa công việc thành công',
        });
    }
    catch (error) {
        console.error('Error deleting job:', error);
        return res.status(500).json({
            success: false,
            error: 'Lỗi server khi xóa công việc',
        });
    }
};
exports.deleteJob = deleteJob;
// ...existing code...
// Cập nhật job
const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, location, type, salary, description, requirements, benefits, deadline, isRemote, tags, status, } = req.body;
        const updatedJob = await prisma_1.default.job.update({
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
                deadline: deadline ? new Date(deadline) : undefined,
            },
        });
        return res.status(200).json({
            success: true,
            data: updatedJob,
        });
    }
    catch (error) {
        console.error('Error updating job:', error);
        return res.status(500).json({
            success: false,
            error: 'Lỗi server khi cập nhật công việc',
        });
    }
};
exports.updateJob = updateJob;
// ...existing code...
//# sourceMappingURL=jobController.js.map