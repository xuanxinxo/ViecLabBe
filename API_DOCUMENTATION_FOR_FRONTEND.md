# 📚 API Documentation cho Frontend Team

## 🌐 **Base URL**
```
Production: https://your-app-name.onrender.com
Local: http://localhost:5000
```

## 🔐 **Authentication**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

---

## 🏠 **1. ROOT & HEALTH ENDPOINTS**

### **GET** `/`
- **Mô tả**: Root endpoint
- **Auth**: Không cần
- **Response**: `{"message": "Backend is running 🚀"}`

### **GET** `/health`
- **Mô tả**: Health check endpoint
- **Auth**: Không cần
- **Response**: `{"status": "OK", "timestamp": "...", "uptime": ...}`

---

## 👤 **2. USER AUTHENTICATION** (`/api/users`)

### **POST** `/api/users/register`
- **Mô tả**: Đăng ký user mới
- **Auth**: Không cần
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### **POST** `/api/users/login`
- **Mô tả**: Đăng nhập
- **Auth**: Không cần
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### **GET** `/api/users/me`
- **Mô tả**: Lấy thông tin user hiện tại
- **Auth**: Bearer token

### **POST** `/api/users/refresh-token`
- **Mô tả**: Làm mới token
- **Auth**: Không cần
- **Body**: `{"refreshToken": "your-refresh-token"}`

### **POST** `/api/users/logout`
- **Mô tả**: Đăng xuất
- **Auth**: Bearer token

---

## 💼 **3. JOBS** (`/api/jobs`)

### **GET** `/api/jobs`
- **Mô tả**: Lấy danh sách tất cả jobs
- **Auth**: Không cần
- **Query params**: `?page=1&limit=10&search=keyword&status=active&type=Full-time`

### **GET** `/api/jobs/:id`
- **Mô tả**: Lấy job theo ID
- **Auth**: Không cần

### **POST** `/api/jobs`
- **Mô tả**: Tạo job mới
- **Auth**: Bearer token
- **Body**:
```json
{
  "title": "Software Engineer",
  "company": "Tech Corp",
  "location": "Ho Chi Minh City",
  "salary": "15-20M VND",
  "description": "Job description...",
  "requirements": ["Node.js", "React"],
  "benefits": ["Health insurance", "Remote work"],
  "type": "Full-time",
  "deadline": "2024-12-31",
  "tags": ["javascript", "react", "nodejs"]
}
```

---

## 🆕 **4. NEW JOBS** (`/api/newjobs`)

### **GET** `/api/newjobs`
- **Mô tả**: Lấy danh sách new jobs
- **Auth**: Không cần

### **GET** `/api/newjobs/:id`
- **Mô tả**: Lấy new job theo ID
- **Auth**: Không cần

### **POST** `/api/newjobs`
- **Mô tả**: Tạo new job
- **Auth**: Không cần

---

## 📝 **5. APPLICATIONS** (`/api/applications`)

### **GET** `/api/applications`
- **Mô tả**: Lấy danh sách applications (public)
- **Auth**: Không cần

### **POST** `/api/applications`
- **Mô tả**: Tạo application mới
- **Auth**: Không cần
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0123456789",
  "message": "I'm interested in this position",
  "cv": "cv-file-url",
  "jobId": "job-id-here"
}
```

### **GET** `/api/applications/my-applications`
- **Mô tả**: Lấy applications của user hiện tại
- **Auth**: Bearer token

---

## 🏢 **6. HIRINGS** (`/api/hirings`)

### **GET** `/api/hirings`
- **Mô tả**: Lấy danh sách hirings
- **Auth**: Không cần

### **GET** `/api/hirings/:id`
- **Mô tả**: Lấy hiring theo ID
- **Auth**: Không cần

### **POST** `/api/hirings`
- **Mô tả**: Tạo hiring mới
- **Auth**: Bearer token

---

## 📰 **7. NEWS** (`/api/news`)

### **GET** `/api/news`
- **Mô tả**: Lấy danh sách tin tức
- **Auth**: Không cần

### **GET** `/api/news/:id`
- **Mô tả**: Lấy tin tức theo ID
- **Auth**: Không cần

### **POST** `/api/news`
- **Mô tả**: Tạo tin tức mới
- **Auth**: Bearer token

---

## 👨‍💼 **8. ADMIN PANEL** (`/api/admin`)

### **Authentication**
- **POST** `/api/admin/login`
- **GET** `/api/admin/profile`

### **Dashboard**
- **GET** `/api/admin/dashboard`

### **User Management**
- **GET** `/api/admin/users`
- **GET** `/api/admin/users/:id`
- **PUT** `/api/admin/users/:id/role`
- **DELETE** `/api/admin/users/:id`

### **Job Management**
- **GET** `/api/admin/jobs`
- **POST** `/api/admin/jobs`
- **PUT** `/api/admin/jobs/:id`
- **DELETE** `/api/admin/jobs/:id`
- **PUT** `/api/admin/jobs/:id/status`

### **Application Management**
- **GET** `/api/admin/applications`
- **POST** `/api/admin/applications`
- **PUT** `/api/admin/applications/:id`
- **DELETE** `/api/admin/applications/:id`

### **News Management**
- **GET** `/api/admin/news`
- **POST** `/api/admin/news`
- **PUT** `/api/admin/news/:id`
- **DELETE** `/api/admin/news/:id`

### **Hiring Management**
- **GET** `/api/admin/hirings`
- **POST** `/api/admin/hirings`
- **PUT** `/api/admin/hirings/:id`
- **DELETE** `/api/admin/hirings/:id`

### **NewJobs Management**
- **GET** `/api/admin/newjobs`
- **POST** `/api/admin/newjobs`
- **PUT** `/api/admin/newjobs/:id`
- **DELETE** `/api/admin/newjobs/:id`

### **System Settings**
- **GET** `/api/admin/settings`
- **PUT** `/api/admin/settings`

---

## 🔧 **Response Format**

### **Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### **Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error info"
}
```

### **Pagination Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

---

## 🎯 **Frontend Integration Examples**

### **1. User Authentication Flow:**
```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.data.accessToken);
  }
  return data;
};

// Get current user
const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/users/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
};
```

### **2. Fetch Jobs:**
```javascript
const getJobs = async (page = 1, limit = 10) => {
  const response = await fetch(`/api/jobs?page=${page}&limit=${limit}`);
  return await response.json();
};
```

### **3. Create Application:**
```javascript
const createApplication = async (applicationData) => {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(applicationData)
  });
  return await response.json();
};
```

### **4. Admin Operations:**
```javascript
// Admin login
const adminLogin = async (username, password) => {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('adminToken', data.data.accessToken);
  }
  return data;
};

// Create job from admin
const createJob = async (jobData) => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch('/api/admin/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jobData)
  });
  return await response.json();
};
```

---

## 📋 **Environment Variables cần thiết**

```env
# Database
DATABASE_URL=mongodb+srv://...

# JWT
JWT_SECRET=your-secret
JWT_REFRESH_SECRET=your-refresh-secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email
EMAIL_PASS=your-password

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123

# CORS
CORS_ORIGINS=https://your-frontend-domain.com
```

---

## 🚀 **Deployment Status**

- ✅ **Backend deployed successfully** on Render
- ✅ **All 32 admin endpoints** working
- ✅ **All CRUD operations** complete
- ✅ **Authentication** working
- ✅ **Database** connected
- ✅ **CORS** configured

**API sẵn sàng cho Frontend integration!** 🎉

