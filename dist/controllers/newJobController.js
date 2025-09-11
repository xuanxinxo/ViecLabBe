"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewJob = exports.updateNewJob = exports.createNewJob = exports.getNewJobById = exports.getAllNewJobs = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// Lấy tất cả NewJob với pagination
const getAllNewJobs = async (req, res) => {
    try {
        const { page = '1', limit, search, type, location } = req.query;
        const pageNum = parseInt(page, 10);
        const limitNum = limit ? parseInt(limit, 10) : undefined; // Không giới hạn nếu không có limit
        const skip = limitNum ? (pageNum - 1) * limitNum : 0;
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
            prisma_1.default.newJob.findMany({
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
            prisma_1.default.newJob.count({ where })
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
        const job = await prisma_1.default.newJob.findUnique({
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
                error: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc: title, company, location, type, salary, description, deadline'
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
        const job = await prisma_1.default.newJob.create({
            data: {
                title,
                company,
                location,
                type,
                salary,
                description,
                requirements,
                benefits,
                deadline: deadlineDate,
                isRemote: Boolean(isRemote),
                tags,
                img: imageUrl,
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
        const { title, company, location, type, salary, description, requirements, benefits, deadline, isRemote, tags, status, img, } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                error: "Job ID is required"
            });
        }
        // Check if job exists
        const existingJob = await prisma_1.default.newJob.findUnique({
            where: { id },
        });
        if (!existingJob) {
            return res.status(404).json({
                success: false,
                error: "Job không tồn tại"
            });
        }
        // Xử lý hình ảnh - có thể là URL hoặc file đã upload
        let imageUrl = img;
        // Nếu có file upload, sử dụng URL của file đã upload
        if (req.file) {
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }
        const job = await prisma_1.default.newJob.update({
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
                img: imageUrl,
            },
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
        const existingJob = await prisma_1.default.newJob.findUnique({
            where: { id },
        });
        if (!existingJob) {
            return res.status(404).json({
                success: false,
                error: "Job không tồn tại"
            });
        }
        await prisma_1.default.newJob.delete({
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