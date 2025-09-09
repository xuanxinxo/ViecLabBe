# 🚀 API Documentation for Frontend - ViecLab

## 🌐 **Base URL:**
```
https://your-deployed-api.com/api
```
*Thay `your-deployed-api.com` bằng domain thực tế của bạn*

---

## 🔐 **Authentication:**

### **Bearer Token Format:**
```javascript
headers: {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
}
```

### **Login để lấy token:**
```javascript
// User login
POST /api/users/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Admin login  
POST /api/admin/login
{
  "username": "admin",
  "password": "admin123"
}
```

---

## 📱 **Frontend Integration Examples:**

### **1. User Authentication:**

```javascript
// Login user
const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      return data.data.user;
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Get current user
const getCurrentUser = async () => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(`${API_BASE}/users/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  return response.json();
};
```

### **2. Jobs Management:**

```javascript
// Get all jobs (for homepage)
const getJobs = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters);
  
  const response = await fetch(`${API_BASE}/jobs?${queryParams}`);
  return response.json();
};

// Get job details
const getJobById = async (jobId) => {
  const response = await fetch(`${API_BASE}/jobs/${jobId}`);
  return response.json();
};

// Create job (for employers)
const createJob = async (jobData) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jobData)
  });
  
  return response.json();
};
```

### **3. Applications:**

```javascript
// Submit application
const submitApplication = async (applicationData) => {
  const response = await fetch(`${API_BASE}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(applicationData)
  });
  
  return response.json();
};

// Get user's applications
const getMyApplications = async () => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(`${API_BASE}/applications/my-applications`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  return response.json();
};
```

### **4. News & Content:**

```javascript
// Get all news
const getNews = async () => {
  const response = await fetch(`${API_BASE}/news`);
  return response.json();
};

// Get hirings
const getHirings = async () => {
  const response = await fetch(`${API_BASE}/hirings`);
  return response.json();
};
```

---

## 🎯 **Key API Endpoints for Frontend:**

### **Public APIs (No Auth Required):**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/users/register` | POST | User registration |
| `/api/users/login` | POST | User login |
| `/api/jobs` | GET | Get all jobs |
| `/api/jobs/:id` | GET | Get job details |
| `/api/applications` | POST | Submit application |
| `/api/news` | GET | Get news |
| `/api/hirings` | GET | Get hirings |
| `/api/newjobs` | GET | Get new jobs |

### **Protected APIs (Auth Required):**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/users/me` | GET | Get current user |
| `/api/users/me` | PUT | Update user profile |
| `/api/jobs` | POST | Create job |
| `/api/jobs/:id` | PUT/PATCH | Update job |
| `/api/jobs/:id` | DELETE | Delete job |
| `/api/applications/my-applications` | GET | Get user's applications |

---

## 📊 **Response Format:**

### **Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message",
  "count": 10
}
```

### **Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🔧 **Frontend Configuration:**

### **1. Environment Variables:**
```javascript
// .env file
REACT_APP_API_BASE_URL=https://your-deployed-api.com/api
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=admin123
```

### **2. API Service Class:**
```javascript
class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_BASE_URL || '/api';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('accessToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // User methods
  async login(email, password) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async getCurrentUser() {
    return this.request('/users/me');
  }

  // Job methods
  async getJobs(filters = {}) {
    const queryParams = new URLSearchParams(filters);
    return this.request(`/jobs?${queryParams}`);
  }

  async createJob(jobData) {
    return this.request('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData)
    });
  }
}

export default new ApiService();
```

---

## 🎨 **Frontend Components Examples:**

### **1. Job List Component:**
```jsx
import React, { useState, useEffect } from 'react';
import ApiService from './services/ApiService';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await ApiService.getJobs();
        if (response.success) {
          setJobs(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {jobs.map(job => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p>{job.company} - {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Type: {job.type}</p>
        </div>
      ))}
    </div>
  );
};
```

### **2. Login Component:**
```jsx
import React, { useState } from 'react';
import ApiService from './services/ApiService';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await ApiService.login(email, password);
      if (response.success) {
        localStorage.setItem('accessToken', response.data.accessToken);
        onLogin(response.data.user);
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
```

---

## 🚀 **Deployment Checklist:**

### **For Frontend Team:**

1. **Update API Base URL:**
   ```javascript
   const API_BASE = 'https://your-deployed-api.com/api';
   ```

2. **Test all endpoints:**
   - User registration/login
   - Job listing
   - Application submission
   - Admin panel access

3. **Handle CORS:**
   - Ensure your frontend domain is in CORS_ORIGINS
   - Test from production domain

4. **Environment Setup:**
   ```bash
   # Frontend .env
   REACT_APP_API_BASE_URL=https://your-deployed-api.com/api
   ```

---

## 📞 **Support:**

- **API Documentation:** This file
- **Admin Panel:** `https://your-deployed-api.com/admin`
- **Health Check:** `https://your-deployed-api.com/health`

**Frontend team có thể bắt đầu tích hợp ngay với các API endpoints trên!** 🎉
