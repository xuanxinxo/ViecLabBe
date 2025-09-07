# Hướng dẫn Deploy ViecLab Backend lên Render

## ✅ Các vấn đề đã được sửa

### 1. **Lỗi Import Extension**
- **Vấn đề**: Các file TypeScript import với extension `.js` thay vì `.ts`
- **Đã sửa**: Loại bỏ tất cả extension `.js` trong import statements
- **Files đã sửa**: Tất cả files trong `src/` folder

### 2. **Cấu hình Package.json**
- **Vấn đề**: `main` field trỏ sai đường dẫn
- **Đã sửa**: Thay đổi từ `"index.js"` thành `"dist/index.js"`

### 3. **Cấu hình CORS**
- **Vấn đề**: CORS hardcode cho localhost
- **Đã sửa**: Sử dụng environment variable `CORS_ORIGINS`

### 4. **Thiếu Health Check**
- **Đã thêm**: Endpoint `/health` cho monitoring

## 🚀 Hướng dẫn Deploy lên Render

### Bước 1: Chuẩn bị Repository
```bash
# Commit tất cả thay đổi
git add .
git commit -m "Fix build issues and optimize for deployment"
git push origin main
```

### Bước 2: Tạo Service trên Render

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
   - **Plan**: Free (hoặc Starter nếu cần)

### Bước 3: Cấu hình Environment Variables

Trong Render Dashboard, thêm các biến môi trường sau:

#### **Bắt buộc:**
```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
```

#### **Email Configuration:**
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### **CORS Configuration:**
```
CORS_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

#### **Optional:**
```
NODE_ENV=production
PORT=5000
```

### Bước 4: Deploy

1. **Click "Create Web Service"**
2. **Render sẽ tự động:**
   - Clone repository
   - Install dependencies
   - Run build command
   - Start application

3. **Kiểm tra logs** để đảm bảo deploy thành công

### Bước 5: Test Deployment

Sau khi deploy thành công, test các endpoints:

```bash
# Health check
curl https://your-app-name.onrender.com/health

# Main endpoint
curl https://your-app-name.onrender.com/

# API endpoints
curl https://your-app-name.onrender.com/api/jobs
```

## 🔧 Troubleshooting

### Build Fails
- **Kiểm tra Node.js version**: Render sử dụng Node 18
- **Kiểm tra dependencies**: Đảm bảo `package.json` đúng
- **Kiểm tra TypeScript**: Build command phải thành công

### Runtime Errors
- **Database Connection**: Kiểm tra `DATABASE_URL`
- **Environment Variables**: Đảm bảo tất cả biến được set
- **CORS Issues**: Kiểm tra `CORS_ORIGINS`

### Performance Issues
- **Free Plan Limitations**: 
  - Sleep sau 15 phút không hoạt động
  - Cold start có thể chậm
  - Consider upgrade lên Starter plan

## 📋 Checklist Deploy

- [ ] Code đã được push lên GitHub
- [ ] Environment variables đã được cấu hình
- [ ] Database connection string đã được test
- [ ] CORS origins đã được set đúng
- [ ] Health check endpoint hoạt động
- [ ] API endpoints response đúng
- [ ] Frontend có thể connect được

## 🎯 Next Steps

1. **Monitor**: Sử dụng Render dashboard để monitor
2. **Logs**: Check logs thường xuyên
3. **Backup**: Setup database backup
4. **SSL**: Render tự động cung cấp SSL
5. **Custom Domain**: Có thể setup custom domain

## 📞 Support

Nếu gặp vấn đề:
1. Check Render logs
2. Test local build: `npm run build && npm start`
3. Verify environment variables
4. Check database connection
