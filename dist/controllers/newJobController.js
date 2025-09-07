"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewJob = exports.updateNewJob = exports.createNewJob = exports.getNewJobById = exports.getAllNewJobs = void 0;
// import { PrismaClient } from "@prisma/client";
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Lấy tất cả NewJob
const getAllNewJobs = async (_req, res) => {
    try {
        console.log('Fetching all new jobs...');
        const jobs = await prisma.newJob.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        console.log(`Found ${jobs.length} jobs`);
        if (jobs.length === 0) {
            console.log('No jobs found in the database');
            // Check if the collection exists
            const collections = await prisma.$runCommandRaw({ listCollections: 1 });
            console.log('Available collections:', collections);
        }
        res.json(jobs);
    }
    catch (error) {
        console.error('Error fetching new jobs:', error);
        res.status(500).json({
            error: "Lỗi server",
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getAllNewJobs = getAllNewJobs;
// Lấy NewJob theo id
const getNewJobById = async (req, res) => {
    try {
        const job = await prisma.newJob.findUnique({
            where: { id: req.params.id },
        });
        if (!job)
            return res.status(404).json({ error: "Không tìm thấy job" });
        return res.json(job);
    }
    catch (error) {
        return res.status(500).json({ error: "Lỗi server" });
    }
};
exports.getNewJobById = getNewJobById;
// Tạo NewJob mới
const createNewJob = async (req, res) => {
    try {
        const job = await prisma.newJob.create({
            data: req.body,
        });
        res.status(201).json(job);
    }
    catch (error) {
        res.status(500).json({ error: "Lỗi server" });
    }
};
exports.createNewJob = createNewJob;
// Cập nhật NewJob
const updateNewJob = async (req, res) => {
    try {
        const job = await prisma.newJob.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(job);
    }
    catch (error) {
        res.status(500).json({ error: "Lỗi server" });
    }
};
exports.updateNewJob = updateNewJob;
// Xóa NewJob
const deleteNewJob = async (req, res) => {
    try {
        await prisma.newJob.delete({
            where: { id: req.params.id },
        });
        res.json({ message: "Đã xóa job" });
    }
    catch (error) {
        res.status(500).json({ error: "Lỗi server" });
    }
};
exports.deleteNewJob = deleteNewJob;
//# sourceMappingURL=newJobController.js.map