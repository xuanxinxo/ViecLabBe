"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.updateNews = exports.getNewsById = exports.createNews = exports.getAllNews = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Lấy tất cả tin tức với pagination
const getAllNews = async (req, res) => {
    try {
        const { page = '1', limit = '10', search } = req.query;
        const pageNum = parseInt(page, 10);
        const limitNum = Math.min(parseInt(limit, 10), 50);
        const skip = (pageNum - 1) * limitNum;
        const where = {};
        // Add search functionality
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { summary: { contains: search, mode: 'insensitive' } }
            ];
        }
        const [news, total] = await Promise.all([
            prisma.news.findMany({
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
            prisma.news.count({ where })
        ]);
        return res.status(200).json({
            success: true,
            data: {
                items: news,
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
        if (!title || !summary || !image || !link) {
            return res.status(400).json({ error: 'Title, summary, image and link are required' });
        }
        const news = await prisma.news.create({
            data: {
                title,
                summary,
                image,
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
        const newsItem = await prisma.news.findUnique({
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
        const updatedNews = await prisma.news.update({
            where: { id },
            data: {
                title,
                summary,
                image,
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
        await prisma.news.delete({
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