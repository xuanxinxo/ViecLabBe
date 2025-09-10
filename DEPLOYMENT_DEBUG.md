# 🐛 Deployment Debug Guide - HTTP 503 Error

## 🔍 **Nguyên nhân có thể gây lỗi 503:**

### **1. Database Connection Issues:**
- ❌ DATABASE_URL không đúng hoặc không có
- ❌ MongoDB connection string sai format
- ❌ Network issues với MongoDB Atlas
- ❌ Database credentials không đúng

### **2. Environment Variables:**
- ❌ Thiếu JWT_SECRET
- ❌ Thiếu JWT_REFRESH_SECRET
- ❌ CORS_ORIGINS không được set

### **3. Build Issues:**
- ❌ TypeScript compilation failed
- ❌ Prisma generate failed
- ❌ Missing dependencies

### **4. Server Issues:**
- ❌ Port binding failed
- ❌ Memory limit exceeded
- ❌ Process crashed on startup

---

## 🔧 **Cách debug:**

### **Step 1: Kiểm tra Health Check**
```bash
curl https://vieclabbe.onrender.com/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "database": "Connected"
}
```

**If Error:**
```json
{
  "status": "ERROR",
  "database": "Disconnected",
  "error": "Connection string error"
}
```

### **Step 2: Kiểm tra Logs trên Render**
1. Vào Render Dashboard
2. Click vào service `vieclab-backend`
3. Xem tab "Logs"
4. Tìm error messages

### **Step 3: Kiểm tra Environment Variables**
Trên Render Dashboard, kiểm tra:
- ✅ `DATABASE_URL` - MongoDB connection string
- ✅ `JWT_SECRET` - Random string
- ✅ `JWT_REFRESH_SECRET` - Random string
- ✅ `NODE_ENV` - production

---

## 🛠️ **Fixes Applied:**

### **1. Improved Error Handling:**
```javascript
// Added database connection test on startup
async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    // Start server
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}
```

### **2. Better Health Check:**
```javascript
app.get("/health", async (_req, res) => {
  try {
    await prisma.$connect();
    await prisma.$disconnect();
    res.status(200).json({ 
      status: "OK", 
      database: "Connected" 
    });
  } catch (error) {
    res.status(503).json({ 
      status: "ERROR", 
      database: "Disconnected",
      error: error.message 
    });
  }
});
```

### **3. Fixed Console Log:**
```javascript
// Before: console.log(`🚀 ???????????????????????????????Server running on http://localhost:${PORT}`);
// After: console.log(`🚀 Server running on port ${PORT}`);
```

---

## 🚀 **Deployment Steps:**

### **1. Update Code:**
```bash
git add .
git commit -m "Fix deployment issues"
git push origin main
```

### **2. Check Render Build:**
- Vào Render Dashboard
- Xem build logs
- Đảm bảo build thành công

### **3. Check Environment Variables:**
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
NODE_ENV=production
CORS_ORIGINS=https://your-frontend-domain.com
```

### **4. Test Endpoints:**
```bash
# Health check
curl https://vieclabbe.onrender.com/health

# API test
curl https://vieclabbe.onrender.com/api/jobs
```

---

## 🔍 **Common Issues & Solutions:**

### **Issue 1: Database Connection Failed**
**Error:** `MongoNetworkError: failed to connect to server`
**Solution:**
- Kiểm tra DATABASE_URL format
- Đảm bảo MongoDB Atlas IP whitelist
- Kiểm tra username/password

### **Issue 2: Build Failed**
**Error:** `TypeScript compilation failed`
**Solution:**
- Kiểm tra TypeScript errors
- Đảm bảo tất cả imports đúng
- Run `npm run build` locally

### **Issue 3: Port Binding Failed**
**Error:** `EADDRINUSE: address already in use`
**Solution:**
- Render tự động set PORT
- Không hardcode port number

### **Issue 4: Memory Limit**
**Error:** `JavaScript heap out of memory`
**Solution:**
- Render free plan có giới hạn memory
- Optimize code
- Consider upgrade plan

---

## 📞 **Next Steps:**

1. **Deploy updated code** với fixes
2. **Check health endpoint** để xác định vấn đề
3. **Review Render logs** để tìm error details
4. **Verify environment variables** đã set đúng
5. **Test API endpoints** sau khi deploy

**Lỗi 503 thường do database connection hoặc environment variables!** 🔧
