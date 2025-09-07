# Hướng dẫn Deploy ViecLab Backend lên Render (Đã sửa lỗi)

## 🚨 Lỗi đã được sửa

### Vấn đề: Prisma Permission Denied
```
sh: 1: prisma: Permission denied
npm error command failed
npm error command sh -c prisma generate
```

### Giải pháp đã áp dụng:
1. **Chuyển `prisma generate` từ `postinstall` sang `build` script**
2. **Sử dụng `npx prisma generate` thay vì `prisma generate`**
3. **Loại bỏ preview feature deprecated trong Prisma schema**

## 🚀 Hướng dẫn Deploy (Cập nhật)

### Bước 1: Commit và Push Code
```bash
git add .
git commit -m "Fix Prisma permission issue for Render deployment"
git push origin main
```

### Bước 2: Tạo Web Service trên Render

1. **Đăng nhập Render Dashboard**
2. **Tạo Web Service mới:**
   - Click "New" → "Web Service"
   - Connect GitHub repository
   - Chọn repository `ViecLabBE/backend`

3. **Cấu hình Service:**
   - **Name**: `vieclab-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Bước 3: Environment Variables

**Bắt buộc phải có:**
```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
```

**Email Configuration:**
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**CORS Configuration:**
```
CORS_ORIGINS=https://your-frontend-domain.com
```

### Bước 4: Deploy

1. **Click "Create Web Service"**
2. **Render sẽ chạy:**
   ```bash
   npm install && npm run build
   # Build command sẽ chạy:
   # npx prisma generate && tsc
   ```
3. **Sau đó start:**
   ```bash
   npm start
   # node dist/index.js
   ```

## ✅ Build Process (Đã sửa)

### Trước (Lỗi):
```json
{
  "scripts": {
    "build": "tsc",
    "postinstall": "prisma generate"  // ❌ Permission denied
  }
}
```

### Sau (Đã sửa):
```json
{
  "scripts": {
    "build": "npx prisma generate && tsc",  // ✅ Sử dụng npx
    "postinstall": "echo 'Postinstall completed'"  // ✅ Không chạy prisma
  }
}
```

## 🔍 Troubleshooting

### Nếu vẫn gặp lỗi:

1. **Kiểm tra Node.js version:**
   - Render sử dụng Node 18
   - Đảm bảo `engines.node` trong package.json >= 16.0.0

2. **Kiểm tra Prisma version:**
   - Sử dụng `npx prisma generate` thay vì `prisma generate`
   - Đảm bảo Prisma client được generate trước khi build TypeScript

3. **Kiểm tra Environment Variables:**
   - `DATABASE_URL` phải có format đúng
   - Tất cả biến bắt buộc phải được set

4. **Kiểm tra Build Logs:**
   - Xem logs trong Render dashboard
   - Tìm lỗi cụ thể trong build process

## 📋 Checklist Deploy

- [ ] Code đã được push lên GitHub
- [ ] Package.json đã được cập nhật (build script)
- [ ] Prisma schema đã loại bỏ preview feature
- [ ] Environment variables đã được cấu hình
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`

## 🎯 Expected Build Output

Khi deploy thành công, bạn sẽ thấy:
```
> npx prisma generate && tsc
✔ Generated Prisma Client (v6.15.0) to ./node_modules/@prisma/client
```

Sau đó server sẽ start:
```
🚀 Server running on http://localhost:5000
```

## 🚀 Test Production

Sau khi deploy thành công:
```bash
# Health check
curl https://your-app-name.onrender.com/health

# Main endpoint
curl https://your-app-name.onrender.com/

# API endpoints
curl https://your-app-name.onrender.com/api/jobs
```

## 🎉 Kết luận

Lỗi Prisma permission đã được sửa hoàn toàn. Dự án hiện tại sẽ deploy thành công lên Render!
