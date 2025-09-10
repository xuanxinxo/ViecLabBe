"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHiring = exports.updateHiring = exports.getHiringById = exports.createHiring = exports.getHirings = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Lấy tất cả tin tuyển dụng với pagination
const getHirings = async (req, res) => {
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
        const [hirings, total] = await Promise.all([
            prisma.hiring.findMany({
                where,
                orderBy: {
                    postedDate: 'desc'
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
                    postedDate: true,
                    img: true
                }
            }),
            prisma.hiring.count({ where })
        ]);
        return res.status(200).json({
            success: true,
            data: {
                items: hirings,
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
        console.error('Error getting hirings:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to get hirings',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
exports.getHirings = getHirings;
// Tạo tin tuyển dụng mới
const createHiring = async (req, res) => {
    try {
        const { title, company, location, type, salary, description, requirements, benefits, deadline, postedDate, img, } = req.body;
        // Validation
        if (!title || !company || !location || !type || !salary || !deadline) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: title, company, location, type, salary, deadline'
            });
        }
        // Validate deadline
        const deadlineDate = new Date(deadline);
        if (isNaN(deadlineDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid deadline format'
            });
        }
        const hiring = await prisma.hiring.create({
            data: {
                title,
                company,
                location,
                type,
                salary,
                description: description || '',
                requirements: requirements || [],
                benefits: benefits || [],
                deadline: deadlineDate,
                postedDate: postedDate ? new Date(postedDate) : new Date(),
                img: img || '',
            },
        });
        return res.status(201).json({ success: true, data: hiring });
    }
    catch (error) {
        console.error('Error creating hiring:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create hiring',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
exports.createHiring = createHiring;
// Lấy chi tiết tin tuyển dụng
const getHiringById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Hiring ID is required'
            });
        }
        const hiring = await prisma.hiring.findUnique({
            where: { id },
        });
        if (!hiring) {
            return res.status(404).json({
                success: false,
                message: 'Hiring not found'
            });
        }
        return res.status(200).json({ success: true, data: hiring });
    }
    catch (error) {
        console.error('Error getting hiring:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to get hiring',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
exports.getHiringById = getHiringById;
// Cập nhật tin tuyển dụng
const updateHiring = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, location, type, salary, description, requirements, benefits, deadline, img, } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Hiring ID is required'
            });
        }
        // Check if hiring exists
        const existingHiring = await prisma.hiring.findUnique({
            where: { id },
        });
        if (!existingHiring) {
            return res.status(404).json({
                success: false,
                message: 'Hiring not found'
            });
        }
        const updatedHiring = await prisma.hiring.update({
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
                img,
            },
        });
        return res.status(200).json({ success: true, data: updatedHiring });
    }
    catch (error) {
        console.error('Error updating hiring:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update hiring',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
exports.updateHiring = updateHiring;
// Xóa tin tuyển dụng
const deleteHiring = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Hiring ID is required'
            });
        }
        // Check if hiring exists
        const existingHiring = await prisma.hiring.findUnique({
            where: { id },
        });
        if (!existingHiring) {
            return res.status(404).json({
                success: false,
                message: 'Hiring not found'
            });
        }
        await prisma.hiring.delete({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            message: 'Hiring deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting hiring:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete hiring',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
exports.deleteHiring = deleteHiring;
//# sourceMappingURL=hiringController.js.map