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
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware
app.use(express_1.default.json());
// Test route
app.get("/", (_req, res) => {
    res.json({ message: "Backend is running 🚀" });
});
// Import routes
const jobRoutes_js_1 = __importDefault(require("./routes/jobRoutes.js"));
const applicationRoutes_js_1 = __importDefault(require("./routes/applicationRoutes.js"));
const hiringRoutes_js_1 = __importDefault(require("./routes/hiringRoutes.js"));
const newsRoutes_js_1 = __importDefault(require("./routes/newsRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const newJobRoutes_js_1 = __importDefault(require("./routes/newJobRoutes.js"));
const adminRoutes_js_1 = __importDefault(require("./routes/adminRoutes.js"));
// Public routes
app.use("/api/users", userRoutes_js_1.default);
app.use("/api/admin", adminRoutes_js_1.default);
// Protected routes
app.use("/api/jobs", jobRoutes_js_1.default);
app.use("/api/newjobs", newJobRoutes_js_1.default);
app.use("/api/applications", applicationRoutes_js_1.default); // Remove auth middleware - routes handle auth internally
app.use("/api/hirings", hiringRoutes_js_1.default);
app.use("/api/news", newsRoutes_js_1.default);
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