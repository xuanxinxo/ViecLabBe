import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// CORS configuration
const corsOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'];

app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

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
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import hiringRoutes from "./routes/hiringRoutes";
import newsRoutes from "./routes/newsRoutes";
import userRoutes from "./routes/userRoutes";
import newJobRoutes from "./routes/newJobRoutes";
import adminRoutes from "./routes/adminRoutes";

// Import middleware
import { auth } from "./middleware/auth";

// Public routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Protected routes
app.use("/api/jobs", jobRoutes);
app.use("/api/newjobs", newJobRoutes);
app.use("/api/applications", applicationRoutes); // Remove auth middleware - routes handle auth internally
app.use("/api/hirings", hiringRoutes);
app.use("/api/news", newsRoutes);

// Xử lý lỗi toàn cục
app.use(
  (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Đã xảy ra lỗi máy chủ" });
  }
);

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
