# ViecLab Backend

Backend API cho ứng dụng ViecLab - nền tảng tìm việc làm.

## Cài đặt và chạy local

1. **Clone repository và cài đặt dependencies:**
```bash
npm install
```

2. **Tạo file `.env` từ `env.example`:**
```bash
cp env.example .env
```

3. **Cấu hình các biến môi trường trong `.env`:**
- `DATABASE_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key cho JWT
- `JWT_REFRESH_SECRET`: Secret key cho refresh token
- `EMAIL_*`: Cấu hình email (Gmail SMTP)
- `CORS_ORIGINS`: Các domain được phép CORS

4. **Generate Prisma client:**
```bash
npx prisma generate
```

5. **Chạy development server:**
```bash
npm run dev
```

6. **Build cho production:**
```bash
npm run build
npm start
```

## Deploy lên Render

### Cách 1: Sử dụng render.yaml (Khuyến nghị)

1. **Push code lên GitHub repository**

2. **Tạo service mới trên Render:**
   - Chọn "New" → "Web Service"
   - Connect GitHub repository
   - Render sẽ tự động detect `render.yaml`

3. **Cấu hình Environment Variables trên Render:**
   - `DATABASE_URL`: MongoDB connection string
   - `JWT_SECRET`: Secret key cho JWT
   - `JWT_REFRESH_SECRET`: Secret key cho refresh token
   - `EMAIL_USER`: Email address
   - `EMAIL_PASS`: App password
   - `CORS_ORIGINS`: Frontend domain (ví dụ: `https://your-frontend.com`)

### Cách 2: Manual setup

1. **Tạo Web Service trên Render:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: `Node`

2. **Cấu hình Environment Variables** (như trên)

## API Endpoints

### Authentication
- `POST /api/users/register` - Đăng ký user
- `POST /api/users/login` - Đăng nhập
- `POST /api/users/refresh` - Refresh token
- `POST /api/users/logout` - Đăng xuất

### Jobs
- `GET /api/jobs` - Lấy danh sách jobs
- `GET /api/jobs/:id` - Lấy job theo ID
- `POST /api/jobs` - Tạo job mới (cần auth)
- `PUT /api/jobs/:id` - Cập nhật job (cần auth)
- `DELETE /api/jobs/:id` - Xóa job (cần auth)

### Applications
- `GET /api/applications` - Lấy danh sách applications
- `POST /api/applications` - Tạo application mới

### News
- `GET /api/news` - Lấy danh sách tin tức

## Cấu trúc dự án

```
src/
├── controllers/     # Business logic
├── middleware/      # Authentication, validation
├── routes/         # API routes
├── models/         # Data models
├── utils/          # Utilities (email, tokens, validators)
├── types/          # TypeScript type definitions
└── index.ts        # Entry point
```

## Lưu ý quan trọng

1. **Environment Variables**: Đảm bảo tất cả biến môi trường được cấu hình đúng trên Render
2. **CORS**: Cấu hình `CORS_ORIGINS` với domain frontend thực tế
3. **Database**: Sử dụng MongoDB Atlas cho production
4. **Email**: Sử dụng App Password cho Gmail thay vì password thường

## Troubleshooting

### Build fails trên Render:
- Kiểm tra Node.js version (>=16.0.0)
- Đảm bảo tất cả dependencies được cài đặt
- Kiểm tra TypeScript compilation

### Runtime errors:
- Kiểm tra environment variables
- Kiểm tra database connection
- Kiểm tra CORS configuration
