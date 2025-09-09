# 🚀 Frontend Integration Guide - ViecLab API

## 📋 **Quick Start for Frontend Team:**

### **1. Get API Information:**
- **Base URL:** `https://your-deployed-api.com/api`
- **Admin Panel:** `https://your-deployed-api.com/admin`
- **Health Check:** `https://your-deployed-api.com/health`

### **2. Files to Download:**
- `API_FOR_FRONTEND.md` - Complete API documentation
- `ViecLab_Frontend_API_Collection.postman_collection.json` - Postman collection for testing
- `frontend-env-example.txt` - Environment configuration

---

## 🔧 **Setup Instructions:**

### **Step 1: Configure Environment**
```bash
# Copy to your frontend .env file
REACT_APP_API_BASE_URL=https://your-deployed-api.com/api
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=admin123
```

### **Step 2: Test API Connection**
```javascript
// Test if API is working
const testAPI = async () => {
  try {
    const response = await fetch('https://your-deployed-api.com/health');
    const data = await response.json();
    console.log('API Status:', data);
  } catch (error) {
    console.error('API Connection Failed:', error);
  }
};
```

### **Step 3: Import Postman Collection**
1. Open Postman
2. Click "Import"
3. Select `ViecLab_Frontend_API_Collection.postman_collection.json`
4. Update `baseUrl` variable with your actual API URL
5. Test all endpoints

---

## 🎯 **Key Integration Points:**

### **1. Authentication Flow:**
```javascript
// Login → Get Token → Store Token → Use for Protected Routes
const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('accessToken', data.data.accessToken);
    return data.data.user;
  }
};
```

### **2. Job Listing:**
```javascript
// Get jobs for homepage
const getJobs = async () => {
  const response = await fetch(`${API_BASE}/jobs`);
  return response.json();
};
```

### **3. Application Submission:**
```javascript
// Submit job application
const submitApplication = async (applicationData) => {
  const response = await fetch(`${API_BASE}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(applicationData)
  });
  return response.json();
};
```

---

## 📱 **Frontend Components Needed:**

### **1. Authentication:**
- Login Form
- Register Form
- Protected Route Wrapper
- Token Management

### **2. Job Management:**
- Job List Component
- Job Detail Component
- Job Search/Filter
- Job Creation Form (for employers)

### **3. Application:**
- Application Form
- Application History
- Application Status

### **4. Content:**
- News List
- News Detail
- Hiring List

---

## 🔐 **Security Notes:**

### **Token Management:**
```javascript
// Always include token for protected routes
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json'
};
```

### **Error Handling:**
```javascript
// Handle API errors gracefully
try {
  const response = await fetch(url, options);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  
  return data;
} catch (error) {
  // Handle error (show toast, redirect, etc.)
  console.error('API Error:', error);
}
```

---

## 🧪 **Testing Checklist:**

### **Before Going Live:**
- [ ] Test user registration
- [ ] Test user login
- [ ] Test job listing
- [ ] Test job details
- [ ] Test application submission
- [ ] Test admin panel access
- [ ] Test all API endpoints with Postman
- [ ] Verify CORS settings
- [ ] Test error handling

---

## 📞 **Support:**

### **If you encounter issues:**
1. Check API health: `GET /health`
2. Verify CORS settings
3. Check authentication tokens
4. Review API documentation
5. Test with Postman collection

### **Common Issues:**
- **CORS Error:** Add your frontend domain to CORS_ORIGINS
- **401 Unauthorized:** Check if token is valid and included
- **404 Not Found:** Verify API base URL
- **500 Server Error:** Check API logs

---

## 🎉 **Ready to Integrate!**

**All API endpoints are ready and tested. Frontend team can start integration immediately!**

**Need help? Check the complete documentation in `API_FOR_FRONTEND.md`**
