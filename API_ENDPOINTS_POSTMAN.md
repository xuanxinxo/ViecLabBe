# 📋 Danh sách đầy đủ API Endpoints cho Postman

## 🌐 **Base URL**
```
Local: http://localhost:5000
Production: https://your-app-name.onrender.com
```

## 🔐 **Authentication Headers**
```
Authorization: Bearer <your-jwt-token>
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

### **GET** `/api/users/verify-email/:token`
- **Mô tả**: Xác thực email
- **Auth**: Không cần
- **Params**: `token` (email verification token)

### **POST** `/api/users/refresh-token`
- **Mô tả**: Làm mới token
- **Auth**: Không cần
- **Body**:
```json
{
  "refreshToken": "your-refresh-token"
}
```

### **POST** `/api/users/logout`
- **Mô tả**: Đăng xuất
- **Auth**: Cần (Bearer token)

### **POST** `/api/users/forgot-password`
- **Mô tả**: Quên mật khẩu
- **Auth**: Không cần
- **Body**:
```json
{
  "email": "john@example.com"
}
```

### **POST** `/api/users/reset-password/:token`
- **Mô tả**: Đặt lại mật khẩu
- **Auth**: Không cần
- **Params**: `token` (reset password token)
- **Body**:
```json
{
  "password": "newpassword123"
}
```

### **GET** `/api/users/me`
- **Mô tả**: Lấy thông tin user hiện tại
- **Auth**: Cần (Bearer token)

### **PUT** `/api/users/me`
- **Mô tả**: Cập nhật thông tin user
- **Auth**: Cần (Bearer token)
- **Body**:
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

### **DELETE** `/api/users/me`
- **Mô tả**: Xóa tài khoản user
- **Auth**: Cần (Bearer token)

---

## 💼 **3. JOBS** (`/api/jobs`)

### **GET** `/api/jobs`
- **Mô tả**: Lấy danh sách tất cả jobs
- **Auth**: Không cần
- **Query params**: `?page=1&limit=10&search=keyword`

### **GET** `/api/jobs/:id`
- **Mô tả**: Lấy job theo ID
- **Auth**: Không cần
- **Params**: `id` (job ID)

### **POST** `/api/jobs`
- **Mô tả**: Tạo job mới
- **Auth**: Cần (Bearer token)
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

### **PUT** `/api/jobs/:id`
- **Mô tả**: Cập nhật job
- **Auth**: Cần (Bearer token)
- **Params**: `id` (job ID)
- **Body**: (Same as POST)

### **PATCH** `/api/jobs/:id`
- **Mô tả**: Cập nhật một phần job
- **Auth**: Cần (Bearer token)
- **Params**: `id` (job ID)
- **Body**: (Partial data)

### **DELETE** `/api/jobs/:id`
- **Mô tả**: Xóa job
- **Auth**: Cần (Bearer token)
- **Params**: `id` (job ID)

---

## 🆕 **4. NEW JOBS** (`/api/newjobs`)

### **GET** `/api/newjobs`
- **Mô tả**: Lấy danh sách new jobs
- **Auth**: Không cần

### **GET** `/api/newjobs/:id`
- **Mô tả**: Lấy new job theo ID
- **Auth**: Không cần
- **Params**: `id` (new job ID)

### **POST** `/api/newjobs`
- **Mô tả**: Tạo new job
- **Auth**: Không cần
- **Body**: (Same as jobs)

### **PUT** `/api/newjobs/:id`
- **Mô tả**: Cập nhật new job
- **Auth**: Không cần
- **Params**: `id` (new job ID)

### **DELETE** `/api/newjobs/:id`
- **Mô tả**: Xóa new job
- **Auth**: Không cần
- **Params**: `id` (new job ID)

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
- **Auth**: Cần (Bearer token)

### **GET** `/api/applications/:id`
- **Mô tả**: Lấy application theo ID
- **Auth**: Cần (Bearer token)
- **Params**: `id` (application ID)

### **PUT** `/api/applications/:id`
- **Mô tả**: Cập nhật application
- **Auth**: Cần (Bearer token)
- **Params**: `id` (application ID)

### **DELETE** `/api/applications/:id`
- **Mô tả**: Xóa application
- **Auth**: Cần (Bearer token)
- **Params**: `id` (application ID)

---

## 🏢 **6. HIRINGS** (`/api/hirings`)

### **GET** `/api/hirings`
- **Mô tả**: Lấy danh sách hirings
- **Auth**: Không cần

### **GET** `/api/hirings/:id`
- **Mô tả**: Lấy hiring theo ID
- **Auth**: Không cần
- **Params**: `id` (hiring ID)

### **POST** `/api/hirings`
- **Mô tả**: Tạo hiring mới
- **Auth**: Cần (Bearer token)
- **Body**: (Similar to jobs)

### **PUT** `/api/hirings/:id`
- **Mô tả**: Cập nhật hiring
- **Auth**: Cần (Bearer token)
- **Params**: `id` (hiring ID)

### **DELETE** `/api/hirings/:id`
- **Mô tả**: Xóa hiring
- **Auth**: Cần (Bearer token)
- **Params**: `id` (hiring ID)

---

## 📰 **7. NEWS** (`/api/news`)

### **GET** `/api/news`
- **Mô tả**: Lấy danh sách tin tức
- **Auth**: Không cần

### **GET** `/api/news/:id`
- **Mô tả**: Lấy tin tức theo ID
- **Auth**: Không cần
- **Params**: `id` (news ID)

### **POST** `/api/news`
- **Mô tả**: Tạo tin tức mới
- **Auth**: Cần (Bearer token)
- **Body**:
```json
{
  "title": "News Title",
  "summary": "News summary",
  "content": "Full news content",
  "image": "image-url",
  "link": "external-link"
}
```

### **PUT** `/api/news/:id`
- **Mô tả**: Cập nhật tin tức
- **Auth**: Cần (Bearer token)
- **Params**: `id` (news ID)

### **DELETE** `/api/news/:id`
- **Mô tả**: Xóa tin tức
- **Auth**: Cần (Bearer token)
- **Params**: `id` (news ID)

---

## 👨‍💼 **8. ADMIN** (`/api/admin`)

### **POST** `/api/admin/login`
- **Mô tả**: Đăng nhập admin
- **Auth**: Không cần
- **Body**:
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### **GET** `/api/admin/profile`
- **Mô tả**: Lấy thông tin admin
- **Auth**: Cần (Admin Bearer token)

### **GET** `/api/admin/dashboard`
- **Mô tả**: Lấy thống kê dashboard
- **Auth**: Cần (Admin Bearer token)

### **GET** `/api/admin/users`
- **Mô tả**: Lấy danh sách tất cả users
- **Auth**: Cần (Admin Bearer token)

### **GET** `/api/admin/users/:id`
- **Mô tả**: Lấy user theo ID
- **Auth**: Cần (Admin Bearer token)
- **Params**: `id` (user ID)

### **PUT** `/api/admin/users/:id/role`
- **Mô tả**: Cập nhật role của user
- **Auth**: Cần (Admin Bearer token)
- **Params**: `id` (user ID)
- **Body**:
```json
{
  "role": "ADMIN"
}
```

### **DELETE** `/api/admin/users/:id`
- **Mô tả**: Xóa user
- **Auth**: Cần (Admin Bearer token)
- **Params**: `id` (user ID)

### **GET** `/api/admin/jobs`
- **Mô tả**: Lấy danh sách tất cả jobs
- **Auth**: Cần (Admin Bearer token)

### **PUT** `/api/admin/jobs/:id/status`
- **Mô tả**: Cập nhật status của job
- **Auth**: Cần (Admin Bearer token)
- **Params**: `id` (job ID)
- **Body**:
```json
{
  "status": "active"
}
```

### **GET** `/api/admin/applications`
- **Mô tả**: Lấy danh sách tất cả applications
- **Auth**: Cần (Admin Bearer token)

### **GET** `/api/admin/news`
- **Mô tả**: Lấy danh sách tất cả news
- **Auth**: Cần (Admin Bearer token)

### **POST** `/api/admin/news`
- **Mô tả**: Tạo news (admin)
- **Auth**: Cần (Admin Bearer token)

### **PUT** `/api/admin/news/:id`
- **Mô tả**: Cập nhật news (admin)
- **Auth**: Cần (Admin Bearer token)
- **Params**: `id` (news ID)

### **DELETE** `/api/admin/news/:id`
- **Mô tả**: Xóa news (admin)
- **Auth**: Cần (Admin Bearer token)
- **Params**: `id` (news ID)

### **GET** `/api/admin/hirings`
- **Mô tả**: Lấy danh sách tất cả hirings
- **Auth**: Cần (Admin Bearer token)

### **POST** `/api/admin/hirings`
- **Mô tả**: Tạo hiring (admin)
- **Auth**: Cần (Admin Bearer token)

### **PUT** `/api/admin/hirings/:id`
- **Mô tả**: Cập nhật hiring (admin)
- **Auth**: Cần (Admin Bearer token)
- **Params**: `id` (hiring ID)

### **DELETE** `/api/admin/hirings/:id`
- **Mô tả**: Xóa hiring (admin)
- **Auth**: Cần (Admin Bearer token)
- **Params**: `id` (hiring ID)

### **GET** `/api/admin/settings`
- **Mô tả**: Lấy system settings
- **Auth**: Cần (Admin Bearer token)

### **PUT** `/api/admin/settings`
- **Mô tả**: Cập nhật system settings
- **Auth**: Cần (Admin Bearer token)
- **Body**:
```json
{
  "siteName": "ViecLab",
  "maintenanceMode": false
}
```

---

## 🧪 **Test Sequence cho Postman**

### **1. Test Basic Endpoints**
```
GET /health
GET /
```

### **2. Test User Authentication**
```
POST /api/users/register
POST /api/users/login
GET /api/users/me (with token)
```

### **3. Test Public APIs**
```
GET /api/jobs
GET /api/newjobs
GET /api/news
GET /api/hirings
```

### **4. Test Protected APIs**
```
POST /api/jobs (with token)
GET /api/applications/my-applications (with token)
```

### **5. Test Admin APIs**
```
POST /api/admin/login
GET /api/admin/dashboard (with admin token)
```

---

## 📝 **Notes**

- **Rate Limiting**: Một số endpoints có rate limiting
- **CORS**: Đã được cấu hình cho production
- **Validation**: Tất cả input đều được validate
- **Error Handling**: Tất cả endpoints đều có error handling
- **Pagination**: Một số endpoints hỗ trợ pagination

## 🔧 **Environment Variables cần thiết**

```
DATABASE_URL=mongodb://...
JWT_SECRET=your-secret
JWT_REFRESH_SECRET=your-refresh-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email
EMAIL_PASS=your-password
CORS_ORIGINS=http://localhost:3000,https://your-frontend.com
```
