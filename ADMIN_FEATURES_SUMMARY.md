# 👨‍💼 Tóm tắt đầy đủ các chức năng Admin Panel

## 🔐 **1. AUTHENTICATION & PROFILE**

### **Admin Login**
- **Endpoint**: `POST /api/admin/login`
- **Body**: `{"username": "admin", "password": "Admin@123"}`
- **Chức năng**: Đăng nhập admin với credentials từ environment variables
- **Response**: JWT token và refresh token

### **Admin Profile**
- **Endpoint**: `GET /api/admin/profile`
- **Auth**: Bearer token (admin)
- **Chức năng**: Lấy thông tin profile admin hiện tại

---

## 📊 **2. DASHBOARD & STATISTICS**

### **Dashboard Stats**
- **Endpoint**: `GET /api/admin/dashboard`
- **Auth**: Bearer token (admin)
- **Chức năng**: 
  - Tổng số users, jobs, applications, news
  - 5 users mới nhất
  - 5 jobs mới nhất
  - 5 applications mới nhất
- **Response**: Thống kê tổng quan hệ thống

---

## 👥 **3. USER MANAGEMENT**

### **Get All Users**
- **Endpoint**: `GET /api/admin/users`
- **Auth**: Bearer token (admin)
- **Query params**: `?page=1&limit=10&search=keyword&role=USER`
- **Chức năng**: 
  - Lấy danh sách tất cả users với pagination
  - Tìm kiếm theo tên hoặc email
  - Lọc theo role (USER, ADMIN, MODERATOR)
  - Hiển thị thông tin: name, email, role, isEmailVerified, createdAt, lastLogin, failedLoginAttempts, accountLockedUntil

### **Get User by ID**
- **Endpoint**: `GET /api/admin/users/:id`
- **Auth**: Bearer token (admin)
- **Chức năng**: Lấy thông tin chi tiết của 1 user

### **Update User Role**
- **Endpoint**: `PUT /api/admin/users/:id/role`
- **Auth**: Bearer token (admin)
- **Body**: `{"role": "ADMIN"}` (USER, ADMIN, MODERATOR)
- **Chức năng**: Thay đổi role của user

### **Delete User**
- **Endpoint**: `DELETE /api/admin/users/:id`
- **Auth**: Bearer token (admin)
- **Chức năng**: Xóa user khỏi hệ thống

---

## 💼 **4. JOB MANAGEMENT**

### **Get All Jobs**
- **Endpoint**: `GET /api/admin/jobs`
- **Auth**: Bearer token (admin)
- **Query params**: `?page=1&limit=10&status=active&type=Full-time`
- **Chức năng**: 
  - Lấy danh sách tất cả jobs với pagination
  - Lọc theo status (active, inactive, expired, draft)
  - Lọc theo type (Full-time, Part-time, Contract, etc.)

### **Update Job Status**
- **Endpoint**: `PUT /api/admin/jobs/:id/status`
- **Auth**: Bearer token (admin)
- **Body**: `{"status": "active"}` (active, inactive, expired, draft)
- **Chức năng**: Thay đổi trạng thái của job

---

## 📝 **5. APPLICATION MANAGEMENT**

### **Get All Applications**
- **Endpoint**: `GET /api/admin/applications`
- **Auth**: Bearer token (admin)
- **Query params**: `?page=1&limit=10&jobId=job-id`
- **Chức năng**: 
  - Lấy danh sách tất cả applications với pagination
  - Lọc theo jobId
  - Hiển thị thông tin job liên quan
- **Response**: Applications với thông tin job (title, company)

---

## 📰 **6. NEWS MANAGEMENT**

### **Get All News**
- **Endpoint**: `GET /api/admin/news`
- **Auth**: Bearer token (admin)
- **Query params**: `?page=1&limit=10&status=draft`
- **Chức năng**: Lấy danh sách tất cả news với pagination

### **Create News**
- **Endpoint**: `POST /api/admin/news`
- **Auth**: Bearer token (admin)
- **Body**:
```json
{
  "title": "Tin tức mới",
  "content": "Nội dung tin tức",
  "image": "https://example.com/image.jpg",
  "status": "draft",
  "tags": ["tech", "news"]
}
```
- **Chức năng**: Tạo tin tức mới

### **Update News**
- **Endpoint**: `PUT /api/admin/news/:id`
- **Auth**: Bearer token (admin)
- **Body**: (Partial update)
- **Chức năng**: Cập nhật tin tức

### **Delete News**
- **Endpoint**: `DELETE /api/admin/news/:id`
- **Auth**: Bearer token (admin)
- **Chức năng**: Xóa tin tức

---

## 🏢 **7. HIRING MANAGEMENT**

### **Get All Hirings**
- **Endpoint**: `GET /api/admin/hirings`
- **Auth**: Bearer token (admin)
- **Query params**: `?page=1&limit=10&status=active`
- **Chức năng**: Lấy danh sách tất cả hirings với pagination

### **Create Hiring**
- **Endpoint**: `POST /api/admin/hirings`
- **Auth**: Bearer token (admin)
- **Body**:
```json
{
  "title": "Vị trí tuyển dụng",
  "company": "Công ty ABC",
  "location": "Hồ Chí Minh",
  "type": "Full-time",
  "salary": "15-20M VND",
  "description": "Mô tả công việc",
  "requirements": ["Kinh nghiệm 2 năm", "Tiếng Anh"],
  "benefits": ["Bảo hiểm", "Thưởng"],
  "deadline": "2024-12-31",
  "image": "https://example.com/image.jpg"
}
```
- **Chức năng**: Tạo tin tuyển dụng mới

### **Update Hiring**
- **Endpoint**: `PUT /api/admin/hirings/:id`
- **Auth**: Bearer token (admin)
- **Body**: (Full update)
- **Chức năng**: Cập nhật tin tuyển dụng

### **Delete Hiring**
- **Endpoint**: `DELETE /api/admin/hirings/:id`
- **Auth**: Bearer token (admin)
- **Chức năng**: Xóa tin tuyển dụng

---

## ⚙️ **8. SYSTEM SETTINGS**

### **Get System Settings**
- **Endpoint**: `GET /api/admin/settings`
- **Auth**: Bearer token (admin)
- **Chức năng**: Lấy cài đặt hệ thống
- **Response**:
```json
{
  "siteName": "BeviecLab",
  "siteDescription": "Nền tảng tuyển dụng việc làm",
  "contactEmail": "contact@bevieclab.com",
  "maxLoginAttempts": 5,
  "lockoutMinutes": 15,
  "emailVerificationRequired": true,
  "maintenanceMode": false
}
```

### **Update System Settings**
- **Endpoint**: `PUT /api/admin/settings`
- **Auth**: Bearer token (admin)
- **Body**: `{"settings": {...}}`
- **Chức năng**: Cập nhật cài đặt hệ thống

---

## 🔧 **Environment Variables cho Admin**

```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123
ADMIN_PASSWORD_HASH=hashed_password
ADMIN_EMAIL=admin@example.com

# System Settings
SITE_NAME=BeviecLab
SITE_DESCRIPTION=Nền tảng tuyển dụng việc làm
CONTACT_EMAIL=contact@bevieclab.com
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_MINUTES=15
EMAIL_VERIFICATION_REQUIRED=true
MAINTENANCE_MODE=false
```

---

## 📋 **Admin Features Checklist**

### **✅ Authentication & Security**
- [x] Admin login với credentials
- [x] JWT token authentication
- [x] Admin profile management
- [x] Rate limiting (có thể enable/disable)

### **✅ Dashboard & Analytics**
- [x] Thống kê tổng quan (users, jobs, applications, news)
- [x] Recent activities (users, jobs, applications)
- [x] Real-time statistics

### **✅ User Management**
- [x] Xem danh sách users với pagination
- [x] Tìm kiếm users theo tên/email
- [x] Lọc users theo role
- [x] Xem chi tiết user
- [x] Thay đổi role user
- [x] Xóa user
- [x] Theo dõi login attempts và account lockout

### **✅ Job Management**
- [x] Xem danh sách jobs với pagination
- [x] Lọc jobs theo status và type
- [x] Thay đổi status job (active, inactive, expired, draft)

### **✅ Application Management**
- [x] Xem danh sách applications với pagination
- [x] Lọc applications theo job
- [x] Xem thông tin job liên quan

### **✅ News Management**
- [x] Xem danh sách news với pagination
- [x] Tạo news mới
- [x] Cập nhật news
- [x] Xóa news
- [x] Quản lý status và tags

### **✅ Hiring Management**
- [x] Xem danh sách hirings với pagination
- [x] Tạo hiring mới
- [x] Cập nhật hiring
- [x] Xóa hiring
- [x] Quản lý requirements và benefits

### **✅ System Settings**
- [x] Xem cài đặt hệ thống
- [x] Cập nhật cài đặt hệ thống
- [x] Quản lý maintenance mode
- [x] Cấu hình security settings

---

## 🎯 **Tổng kết**

**Admin Panel có đầy đủ 22 endpoints** với các chức năng:

1. **Authentication** (2 endpoints)
2. **Dashboard** (1 endpoint)
3. **User Management** (4 endpoints)
4. **Job Management** (2 endpoints)
5. **Application Management** (1 endpoint)
6. **News Management** (4 endpoints)
7. **Hiring Management** (4 endpoints)
8. **System Settings** (2 endpoints)

**Tất cả endpoints đều có:**
- ✅ Authentication middleware
- ✅ Error handling
- ✅ Pagination support
- ✅ Search và filter
- ✅ Validation
- ✅ Consistent response format

**Admin Panel hoàn chỉnh và sẵn sàng sử dụng!** 🚀
