"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.updateNews = exports.getNewsById = exports.createNews = exports.getAllNews = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// Lấy tất cả tin tức với pagination
const getAllNews = async (req, res) => {
    try {
        const { page = '1', limit, search } = req.query;
        const pageNum = parseInt(page, 10);
        const limitNum = limit ? parseInt(limit, 10) : undefined; // Không giới hạn nếu không có limit
        const skip = limitNum ? (pageNum - 1) * limitNum : 0;
        const where = {};
        // Add search functionality
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { summary: { contains: search, mode: 'insensitive' } }
            ];
        }
        const [news, total] = await Promise.all([
            prisma_1.default.news.findMany({
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
            prisma_1.default.news.count({ where })
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
    }
    catch (error) {
        console.error('Error getting news:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to get news'
        });
    }
};
exports.getAllNews = getAllNews;
// Tạo tin tức mới
const createNews = async (req, res) => {
    try {
        const { title, summary, image, link, date } = req.body;
        if (!title || !summary || !link) {
            return res.status(400).json({ error: 'Title, summary and link are required' });
        }
        const news = await prisma_1.default.news.create({
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
    }
    catch (error) {
        console.error('Error creating news:', error);
        return res.status(500).json({ error: 'Failed to create news' });
    }
};
exports.createNews = createNews;
// Lấy chi tiết tin tức
const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const newsItem = await prisma_1.default.news.findUnique({
            where: { id },
        });
        if (!newsItem) {
            return res.status(404).json({ error: 'News not found' });
        }
        return res.status(200).json(newsItem);
    }
    catch (error) {
        console.error('Error getting news:', error);
        return res.status(500).json({ error: 'Failed to get news' });
    }
};
exports.getNewsById = getNewsById;
// Cập nhật tin tức
const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, summary, image, link, date } = req.body;
        const updatedNews = await prisma_1.default.news.update({
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
    }
    catch (error) {
        console.error('Error updating news:', error);
        return res.status(500).json({ error: 'Failed to update news' });
    }
};
exports.updateNews = updateNews;
// Xóa tin tức
const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.news.delete({
            where: { id },
        });
        return res.status(200).json({ message: 'News deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting news:', error);
        return res.status(500).json({ error: 'Failed to delete news' });
    }
};
exports.deleteNews = deleteNews;
//# sourceMappingURL=newsController.js.map