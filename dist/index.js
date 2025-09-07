"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// CORS configuration
const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'];
app.use((0, cors_1.default)({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware
app.use(express_1.default.json());
// Health check route
app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
// Test route
app.get("/", (_req, res) => {
    res.json({ message: "Backend is running 🚀" });
});
// Import routes
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
const hiringRoutes_1 = __importDefault(require("./routes/hiringRoutes"));
const newsRoutes_1 = __importDefault(require("./routes/newsRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const newJobRoutes_1 = __importDefault(require("./routes/newJobRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
// Public routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
// Protected routes
app.use("/api/jobs", jobRoutes_1.default);
app.use("/api/newjobs", newJobRoutes_1.default);
app.use("/api/applications", applicationRoutes_1.default); // Remove auth middleware - routes handle auth internally
app.use("/api/hirings", hiringRoutes_1.default);
app.use("/api/news", newsRoutes_1.default);
// Xử lý lỗi toàn cục
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Đã xảy ra lỗi máy chủ" });
});
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`🚀 ???????????????????????????????Server running on http://localhost:${PORT}`);
});
// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received. Shutting down gracefully");
    await prisma.$disconnect();
    server.close(() => {
        console.log("Process terminated");
    });
});
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("Prisma connection closed");
    process.exit(0);
});
//# sourceMappingURL=index.js.map