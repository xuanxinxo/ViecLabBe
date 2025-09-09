# 🧪 Hướng dẫn Test Admin APIs

## 🔗 **Bước 1: Cập nhật Base URL**

Trong file `test-admin-apis.js`, thay thế:
```javascript
const BASE_URL = 'https://your-app-name.onrender.com';
```

Bằng link deploy thực tế của bạn, ví dụ:
```javascript
const BASE_URL = 'https://vieclab-backend.onrender.com';
```

## 🚀 **Bước 2: Chạy Test**

```bash
node test-admin-apis.js
```

## 📋 **Các API sẽ được test:**

### 1. **Health Check** ✅
- **Endpoint**: `GET /health`
- **Auth**: Không cần
- **Expected**: Status OK, uptime info

### 2. **Admin Login** 🔐
- **Endpoint**: `POST /api/admin/login`
- **Credentials**: 
  - Username: `admin`
  - Password: `Admin@123`
- **Expected**: Access token

### 3. **Dashboard Stats** 📊
- **Endpoint**: `GET /api/admin/dashboard`
- **Auth**: Bearer token
- **Expected**: Statistics data

### 4. **Get Users** 👥
- **Endpoint**: `GET /api/admin/users?page=1&limit=5`
- **Auth**: Bearer token
- **Expected**: List of users

### 5. **Get Jobs** 💼
- **Endpoint**: `GET /api/admin/jobs?page=1&limit=5`
- **Auth**: Bearer token
- **Expected**: List of jobs

### 6. **Create Job** ➕
- **Endpoint**: `POST /api/admin/jobs`
- **Auth**: Bearer token
- **Expected**: New job created

### 7. **Get Applications** 📝
- **Endpoint**: `GET /api/admin/applications?page=1&limit=5`
- **Auth**: Bearer token
- **Expected**: List of applications

### 8. **Get New Jobs** 🆕
- **Endpoint**: `GET /api/admin/newjobs?page=1&limit=5`
- **Auth**: Bearer token
- **Expected**: List of new jobs

### 9. **Create New Job** ➕
- **Endpoint**: `POST /api/admin/newjobs`
- **Auth**: Bearer token
- **Expected**: New job created

---

## 🧪 **Test Manual với Postman/Thunder Client**

### **1. Health Check**
```http
GET https://your-deploy-link.onrender.com/health
```

### **2. Admin Login**
```http
POST https://your-deploy-link.onrender.com/api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin@123"
}
```

### **3. Dashboard (sau khi login)**
```http
GET https://your-deploy-link.onrender.com/api/admin/dashboard
Authorization: Bearer YOUR_TOKEN_HERE
```

### **4. Get All Jobs**
```http
GET https://your-deploy-link.onrender.com/api/admin/jobs?page=1&limit=10
Authorization: Bearer YOUR_TOKEN_HERE
```

### **5. Create New Job**
```http
POST https://your-deploy-link.onrender.com/api/admin/jobs
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Senior Developer",
  "company": "Tech Corp",
  "location": "Ho Chi Minh City",
  "type": "Full-time",
  "salary": "20-25M VND",
  "description": "Senior developer position",
  "requirements": ["5+ years experience", "Node.js", "React"],
  "benefits": ["Health insurance", "Remote work"],
  "deadline": "2024-12-31",
  "tags": ["senior", "javascript", "react"],
  "isRemote": true,
  "img": "https://example.com/image.jpg",
  "status": "active"
}
```

---

## 🔍 **Kiểm tra Data có tồn tại không:**

### **Public APIs (không cần auth):**

1. **Get All Jobs**
```http
GET https://your-deploy-link.onrender.com/api/jobs
```

2. **Get All Applications**
```http
GET https://your-deploy-link.onrender.com/api/applications
```

3. **Get All News**
```http
GET https://your-deploy-link.onrender.com/api/news
```

4. **Get All New Jobs**
```http
GET https://your-deploy-link.onrender.com/api/newjobs
```

---

## 📊 **Expected Results:**

### **Nếu có data:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "...",
        "title": "...",
        "company": "...",
        // ... other fields
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "pages": 1
    }
  }
}
```

### **Nếu chưa có data:**
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "pages": 0
    }
  }
}
```

---

## 🚨 **Troubleshooting:**

### **1. CORS Error:**
- Kiểm tra CORS_ORIGINS trong environment variables
- Thêm domain frontend vào CORS_ORIGINS

### **2. 401 Unauthorized:**
- Kiểm tra admin credentials
- Kiểm tra JWT_SECRET trong env

### **3. 500 Internal Server Error:**
- Kiểm tra DATABASE_URL
- Kiểm tra logs trên Render dashboard

### **4. Connection Timeout:**
- Render có thể đang sleep (free tier)
- Thử lại sau vài giây

---

## 🎯 **Quick Test Commands:**

```bash
# Test health
curl https://your-deploy-link.onrender.com/health

# Test admin login
curl -X POST https://your-deploy-link.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}'

# Test get jobs (public)
curl https://your-deploy-link.onrender.com/api/jobs
```

**Hãy thay thế `your-deploy-link.onrender.com` bằng link deploy thực tế của bạn!** 🚀
