import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
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

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check route
app.get("/health", async (_req, res) => {
  try {
    // Test database connection
    await prisma.$connect();
    await prisma.$disconnect();

    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: "Connected"
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: "Disconnected",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Test route
app.get("/", (_req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// Admin panel route
app.get("/admin", (_req, res) => {
  res.sendFile("admin.html", { root: __dirname + "/../" });
});

// Import routes
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import hiringRoutes from "./routes/hiringRoutes";
import newsRoutes from "./routes/newsRoutes";
import userRoutes from "./routes/userRoutes";
import newJobRoutes from "./routes/newJobRoutes";
import adminRoutes from "./routes/adminRoutes";
import uploadRoutes from "./routes/uploadRoutes";

// Import middleware
import { auth } from "./middleware/auth";

// Public routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
// Protected routes
app.use("/api/jobs", jobRoutes);
app.use("/api/newjobs", newJobRoutes);
app.use("/api/applications", applicationRoutes); // Remove auth middleware - routes handle auth internally
app.use("/api/hirings", hiringRoutes);
app.use("/api/news", newsRoutes);

// Xử lý lỗi toàn cục
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[GLOBAL ERROR HANDLER]', err);
  res.status(500).json({
    success: false,
    error: "Đã xảy ra lỗi máy chủ"
  });
}
);

const PORT = process.env.PORT || 5000;

// Test database connection on startup
async function startServer() {
  try {
    console.log('🔌 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/health`);
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

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
