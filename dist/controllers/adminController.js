"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSystemSettings = exports.getSystemSettings = exports.deleteNewJob = exports.updateNewJob = exports.createNewJob = exports.getAllNewJobs = exports.deleteHiring = exports.updateHiring = exports.createHiring = exports.getAllHirings = exports.deleteNews = exports.updateNews = exports.createNews = exports.getAllNews = exports.deleteApplication = exports.updateApplication = exports.createApplication = exports.getAllApplications = exports.updateJobStatus = exports.deleteJob = exports.updateJob = exports.createJob = exports.getAllJobs = exports.deleteUser = exports.updateUserRole = exports.getUserById = exports.getAllUsers = exports.getDashboardStats = exports.getAdminProfile = exports.adminLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokens_1 = require("../utils/tokens");
const prisma_1 = __importDefault(require("../lib/prisma"));
// Admin login
const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin đăng nhập'
            });
        }
        // Get admin credentials from environment variables
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPasswordHash = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD_HASH || '';
        const adminPasswordPlain = process.env.ADMIN_PASSWORD_PLAINTEXT || '';
        const adminRole = 'ADMIN';
        // Verify credentials (support hash or plaintext for dev convenience)
        let isPasswordValid = false;
        if (adminPasswordHash) {
            try {
                isPasswordValid = await bcrypt_1.default.compare(password, adminPasswordHash);
            }
            catch {
                isPasswordValid = false;
            }
        }
        else if (adminPasswordPlain) {
            isPasswordValid = password === adminPasswordPlain;
        }
        else {
            // Development fallback if no envs set
            isPasswordValid = username === 'admin' && password === 'Admin@123';
        }
        if (username !== adminUsername || !isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
        }
        // Generate tokens
        const accessToken = (0, tokens_1.generateAccessToken)('0', username, adminRole);
        const refreshToken = (0, tokens_1.generateRefreshToken)('0');
        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            data: {
                user: {
                    id: 0,
                    username,
                    role: adminRole
                },
                accessToken,
                refreshToken
            }
        });
    }
    catch (error) {
        console.error('Admin login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.adminLogin = adminLogin;
// Get current admin profile
const getAdminProfile = async (_req, res) => {
    try {
        return res.status(200).json({
            success: true,
            data: {
                id: 0,
                username: process.env.ADMIN_USERNAME || 'admin',
                role: 'ADMIN',
                email: process.env.ADMIN_EMAIL || 'admin@example.com'
            }
        });
    }
    catch (error) {
        console.error('Get admin profile error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.getAdminProfile = getAdminProfile;
// ===== DASHBOARD STATISTICS =====
// Get dashboard statistics
const getDashboardStats = async (_req, res) => {
    try {
        const [totalUsers, totalJobs, totalApplications, totalNews, recentUsers, recentJobs, recentApplications] = await Promise.all([
            prisma_1.default.user.count(),
            prisma_1.default.job.count(),
            prisma_1.default.application.count(),
            prisma_1.default.newJob.count(),
            prisma_1.default.user.findMany({
                take: 5,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma_1.default.job.findMany({
                take: 5,
                select: {
                    id: true,
                    title: true,
                    company: true,
                    postedDate: true
                },
                orderBy: { postedDate: 'desc' }
            }),
            prisma_1.default.application.findMany({
                take: 5,
                include: {
                    job: {
                        select: {
                            title: true,
                            company: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            })
        ]);
        return res.status(200).json({
            success: true,
            data: {
                statistics: {
                    totalUsers,
                    totalJobs,
                    totalApplications,
                    totalNews
                },
                recent: {
                    users: recentUsers,
                    jobs: recentJobs,
                    applications: recentApplications
                }
            }
        });
    }
    catch (error) {
        console.error('Get dashboard stats error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.getDashboardStats = getDashboardStats;
// ===== USER MANAGEMENT =====
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', role = '' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } }
            ];
        }
        if (role) {
            where.role = role;
        }
        const [users, total] = await Promise.all([
            prisma_1.default.user.findMany({
                where,
                skip,
                take: Number(limit),
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    isEmailVerified: true,
                    createdAt: true,
                    lastLogin: true,
                    failedLoginAttempts: true,
                    accountLockedUntil: true
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma_1.default.user.count({ where })
        ]);
        return res.status(200).json({
            success: true,
            data: {
                items: users,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / Number(limit))
                }
            }
        });
    }
    catch (error) {
        console.error('Get all users error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma_1.default.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isEmailVerified: true,
                createdAt: true,
                lastLogin: true,
                failedLoginAttempts: true,
                accountLockedUntil: true
            }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }
        return res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        console.error('Get user by ID error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.getUserById = getUserById;
// Update user role
const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!role || !['USER', 'ADMIN', 'MODERATOR'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Role không hợp lệ'
            });
        }
        const user = await prisma_1.default.user.update({
            where: { id },
            data: { role },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });
        return res.status(200).json({
            success: true,
            message: 'Cập nhật role thành công',
            data: user
        });
    }
    catch (error) {
        console.error('Update user role error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.updateUserRole = updateUserRole;
// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.user.delete({
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: 'Xóa người dùng thành công'
        });
    }
    catch (error) {
        console.error('Delete user error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.deleteUser = deleteUser;
// ===== JOB MANAGEMENT =====
// Get all jobs for admin
const getAllJobs = async (req, res) => {
    try {
        const { page = 1, limit = 10, status = '', type = '' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {};
        if (status)
            where.status = status;
        if (type)
            where.type = type;
        const [jobs, total] = await Promise.all([
            prisma_1.default.job.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { postedDate: 'desc' }
            }),
            prisma_1.default.job.count({ where })
        ]);
        return res.status(200).json({
            success: true,
            data: {
                items: jobs,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / Number(limit))
                }
            }
        });
    }
    catch (error) {
        console.error('Get all jobs error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.getAllJobs = getAllJobs;
// Create job
const createJob = async (req, res) => {
    try {
        const { title, company, location, type, salary, description, requirements = [], benefits = [], deadline, tags = [], isRemote = false, img } = req.body;
        if (!title || !company || !location || !type || !salary || !description || !deadline) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }
        const job = await prisma_1.default.job.create({
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
                tags,
                isRemote,
                img,
                status: 'active',
                postedDate: new Date()
            }
        });
        return res.status(201).json({
            success: true,
            message: 'Tạo job thành công',
            data: job
        });
    }
    catch (error) {
        console.error('Create job error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.createJob = createJob;
// Update job
const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (updateData.deadline) {
            updateData.deadline = new Date(updateData.deadline);
        }
        const job = await prisma_1.default.job.update({
            where: { id },
            data: updateData
        });
        return res.status(200).json({
            success: true,
            message: 'Cập nhật job thành công',
            data: job
        });
    }
    catch (error) {
        console.error('Update job error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.updateJob = updateJob;
// Delete job
const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.job.delete({
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: 'Xóa job thành công'
        });
    }
    catch (error) {
        console.error('Delete job error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.deleteJob = deleteJob;
// Update job status
const updateJobStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status || !['active', 'inactive', 'expired', 'draft'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status không hợp lệ'
            });
        }
        const job = await prisma_1.default.job.update({
            where: { id },
            data: { status }
        });
        return res.status(200).json({
            success: true,
            message: 'Cập nhật status thành công',
            data: job
        });
    }
    catch (error) {
        console.error('Update job status error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.updateJobStatus = updateJobStatus;
// ===== APPLICATION MANAGEMENT =====
// Get all applications
const getAllApplications = async (req, res) => {
    try {
        const { page = 1, limit = 10, jobId = '' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {};
        if (jobId)
            where.jobId = jobId;
        const [applications, total] = await Promise.all([
            prisma_1.default.application.findMany({
                where,
                skip,
                take: Number(limit),
                include: {
                    job: {
                        select: {
                            id: true,
                            title: true,
                            company: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma_1.default.application.count({ where })
        ]);
        return res.status(200).json({
            success: true,
            data: {
                items: applications,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / Number(limit))
                }
            }
        });
    }
    catch (error) {
        console.error('Get all applications error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.getAllApplications = getAllApplications;
// Create application
const createApplication = async (req, res) => {
    try {
        const { name, email, phone, message, cv, jobId, hiringId } = req.body;
        if (!name || !email || !phone || (!jobId && !hiringId)) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }
        const application = await prisma_1.default.application.create({
            data: {
                name,
                email,
                phone,
                message,
                cv,
                jobId: jobId || null,
                hiringId: hiringId || null,
                createdAt: new Date()
            }
        });
        return res.status(201).json({
            success: true,
            message: 'Tạo application thành công',
            data: application
        });
    }
    catch (error) {
        console.error('Create application error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.createApplication = createApplication;
// Update application
const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const application = await prisma_1.default.application.update({
            where: { id },
            data: updateData
        });
        return res.status(200).json({
            success: true,
            message: 'Cập nhật application thành công',
            data: application
        });
    }
    catch (error) {
        console.error('Update application error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.updateApplication = updateApplication;
// Delete application
const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.application.delete({
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: 'Xóa application thành công'
        });
    }
    catch (error) {
        console.error('Delete application error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.deleteApplication = deleteApplication;
// ===== NEWS MANAGEMENT =====
// Get all news for admin
const getAllNews = async (req, res) => {
    try {
        const { page = 1, limit = 10, status = '' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {};
        if (status)
            where.status = status;
        const [news, total] = await Promise.all([
            prisma_1.default.newJob.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { postedDate: 'desc' }
            }),
            prisma_1.default.newJob.count({ where })
        ]);
        return res.status(200).json({
            success: true,
            data: {
                items: news,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / Number(limit))
                }
            }
        });
    }
    catch (error) {
        console.error('Get all news error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.getAllNews = getAllNews;
// Create news
const createNews = async (req, res) => {
    try {
        const { title, content, image, status = 'draft', tags = [] } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }
        const news = await prisma_1.default.newJob.create({
            data: {
                title,
                description: content,
                img: image,
                status,
                tags,
                company: 'Admin',
                location: 'System',
                type: 'News',
                salary: 'N/A',
                requirements: [],
                benefits: [],
                isRemote: false,
                deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
                postedDate: new Date()
            }
        });
        return res.status(201).json({
            success: true,
            message: 'Tạo tin tức thành công',
            data: news
        });
    }
    catch (error) {
        console.error('Create news error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.createNews = createNews;
// Update news
const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, image, status, tags } = req.body;
        const updateData = {};
        if (title)
            updateData.title = title;
        if (content)
            updateData.description = content;
        if (image)
            updateData.img = image;
        if (status)
            updateData.status = status;
        if (tags)
            updateData.tags = tags;
        const news = await prisma_1.default.newJob.update({
            where: { id },
            data: updateData
        });
        return res.status(200).json({
            success: true,
            message: 'Cập nhật tin tức thành công',
            data: news
        });
    }
    catch (error) {
        console.error('Update news error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.updateNews = updateNews;
// Delete news
const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.newJob.delete({
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: 'Xóa tin tức thành công'
        });
    }
    catch (error) {
        console.error('Delete news error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.deleteNews = deleteNews;
// ===== HIRING MANAGEMENT =====
// Get all hirings for admin
const getAllHirings = async (req, res) => {
    try {
        const { page = 1, limit = 10, status = '' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {};
        if (status)
            where.status = status;
        const [hirings, total] = await Promise.all([
            prisma_1.default.hiring.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { postedDate: 'desc' }
            }),
            prisma_1.default.hiring.count({ where })
        ]);
        return res.status(200).json({
            success: true,
            data: {
                items: hirings,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / Number(limit))
                }
            }
        });
    }
    catch (error) {
        console.error('Get all hirings error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.getAllHirings = getAllHirings;
// Create hiring
const createHiring = async (req, res) => {
    try {
        const { title, company, location, type, salary, description, requirements = [], benefits = [], deadline, image } = req.body;
        if (!title || !company || !location || !type || !salary || !description || !deadline) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }
        const hiring = await prisma_1.default.hiring.create({
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
                img: image,
                postedDate: new Date()
            }
        });
        return res.status(201).json({
            success: true,
            message: 'Tạo tin tuyển dụng thành công',
            data: hiring
        });
    }
    catch (error) {
        console.error('Create hiring error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.createHiring = createHiring;
// Update hiring
const updateHiring = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (updateData.deadline) {
            updateData.deadline = new Date(updateData.deadline);
        }
        const hiring = await prisma_1.default.hiring.update({
            where: { id },
            data: updateData
        });
        return res.status(200).json({
            success: true,
            message: 'Cập nhật tin tuyển dụng thành công',
            data: hiring
        });
    }
    catch (error) {
        console.error('Update hiring error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.updateHiring = updateHiring;
// Delete hiring
const deleteHiring = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.hiring.delete({
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: 'Xóa tin tuyển dụng thành công'
        });
    }
    catch (error) {
        console.error('Delete hiring error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.deleteHiring = deleteHiring;
// ===== NEWJOBS MANAGEMENT =====
// Get all newjobs for admin
const getAllNewJobs = async (req, res) => {
    try {
        const { page = 1, limit = 10, status = '', type = '' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {};
        if (status)
            where.status = status;
        if (type)
            where.type = type;
        const [newJobs, total] = await Promise.all([
            prisma_1.default.newJob.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { createdAt: 'desc' }
            }),
            prisma_1.default.newJob.count({ where })
        ]);
        return res.status(200).json({
            success: true,
            data: {
                items: newJobs,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / Number(limit))
                }
            }
        });
    }
    catch (error) {
        console.error('Get all newjobs error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.getAllNewJobs = getAllNewJobs;
// Create newjob
const createNewJob = async (req, res) => {
    try {
        const { title, company, location, type, salary, description, requirements = [], benefits = [], deadline, tags = [], isRemote = false, img, status = 'active' } = req.body;
        if (!title || !company || !location || !type || !salary || !description || !deadline) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }
        const newJob = await prisma_1.default.job.create({
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
                tags,
                isRemote,
                img,
                status,
                postedDate: new Date()
            }
        });
        return res.status(201).json({
            success: true,
            message: 'Tạo newjob thành công',
            data: newJob
        });
    }
    catch (error) {
        console.error('Create newjob error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.createNewJob = createNewJob;
// Update newjob
const updateNewJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (updateData.deadline) {
            updateData.deadline = new Date(updateData.deadline);
        }
        const newJob = await prisma_1.default.newJob.update({
            where: { id },
            data: updateData
        });
        return res.status(200).json({
            success: true,
            message: 'Cập nhật newjob thành công',
            data: newJob
        });
    }
    catch (error) {
        console.error('Update newjob error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.updateNewJob = updateNewJob;
// Delete newjob
const deleteNewJob = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.newJob.delete({
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: 'Xóa newjob thành công'
        });
    }
    catch (error) {
        console.error('Delete newjob error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.deleteNewJob = deleteNewJob;
// ===== SYSTEM SETTINGS =====
// Get system settings
const getSystemSettings = async (_req, res) => {
    try {
        const settings = {
            siteName: process.env.SITE_NAME || 'BeviecLab',
            siteDescription: process.env.SITE_DESCRIPTION || 'Nền tảng tuyển dụng việc làm',
            contactEmail: process.env.CONTACT_EMAIL || 'contact@bevieclab.com',
            maxLoginAttempts: process.env.MAX_LOGIN_ATTEMPTS || 5,
            lockoutMinutes: process.env.LOCKOUT_MINUTES || 15,
            emailVerificationRequired: process.env.EMAIL_VERIFICATION_REQUIRED === 'true',
            maintenanceMode: process.env.MAINTENANCE_MODE === 'true'
        };
        return res.status(200).json({
            success: true,
            data: settings
        });
    }
    catch (error) {
        console.error('Get system settings error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.getSystemSettings = getSystemSettings;
// Update system settings
const updateSystemSettings = async (req, res) => {
    try {
        const { settings } = req.body;
        console.log('System settings update requested:', settings);
        return res.status(200).json({
            success: true,
            message: 'Cập nhật cài đặt hệ thống thành công'
        });
    }
    catch (error) {
        console.error('Update system settings error:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống. Vui lòng thử lại sau.'
        });
    }
};
exports.updateSystemSettings = updateSystemSettings;
//# sourceMappingURL=adminController.js.map