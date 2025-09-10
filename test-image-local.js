const http = require('http');

const BASE_URL = 'http://localhost:5000'; // Local server

// Test data với hình ảnh
const testJobData = {
  title: "Test Job với hình ảnh",
  company: "Test Company",
  location: "Hồ Chí Minh",
  type: "Full-time",
  salary: "15-20M VND",
  description: "Mô tả công việc test với hình ảnh",
  requirements: ["Node.js", "React"],
  benefits: ["Health insurance"],
  deadline: "2024-12-31",
  tags: ["javascript", "test"],
  isRemote: true,
  img: "https://via.placeholder.com/300x200/0066CC/FFFFFF?text=Test+Job+Image"
};

let adminToken = '';

// Helper function để make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Admin login
async function adminLogin() {
  console.log('🔐 Đăng nhập admin...');
  
  const loginData = {
    username: 'admin',
    password: 'admin123'
  };

  const response = await makeRequest(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  });

  if (response.status === 200 && response.data.success) {
    adminToken = response.data.data.accessToken;
    console.log('✅ Đăng nhập admin thành công');
    return true;
  } else {
    console.log('❌ Đăng nhập admin thất bại:', response.data);
    return false;
  }
}

// Test Job với hình ảnh
async function testJobImageUpload() {
  console.log('\n📋 === TEST JOB IMAGE UPLOAD ===');
  
  // 1. Tạo job với hình ảnh
  console.log('1. Tạo job với hình ảnh...');
  const createResponse = await makeRequest(`${BASE_URL}/api/admin/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify(testJobData)
  });

  if (createResponse.status === 201 && createResponse.data.success) {
    const jobId = createResponse.data.data.id;
    console.log('✅ Tạo job thành công, ID:', jobId);
    console.log('🖼️ Hình ảnh job:', createResponse.data.data.img);

    // 2. Update job với hình ảnh mới
    console.log('\n2. Update job với hình ảnh mới...');
    const updateData = {
      ...testJobData,
      title: "Updated Job với hình ảnh mới",
      img: "https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Updated+Job+Image"
    };

    const updateResponse = await makeRequest(`${BASE_URL}/api/admin/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(updateData)
    });

    if (updateResponse.status === 200 && updateResponse.data.success) {
      console.log('✅ Update job thành công');
      console.log('🖼️ Hình ảnh job sau update:', updateResponse.data.data.img);
    } else {
      console.log('❌ Update job thất bại:', updateResponse.data);
    }

    return jobId;
  } else {
    console.log('❌ Tạo job thất bại:', createResponse.data);
    return null;
  }
}

// Main test function
async function runImageUploadTests() {
  console.log('🚀 BẮT ĐẦU TEST CHỨC NĂNG UPLOAD VÀ UPDATE HÌNH ẢNH (LOCAL)');
  console.log('=' .repeat(60));

  // Đăng nhập admin
  const loginSuccess = await adminLogin();
  if (!loginSuccess) {
    console.log('❌ Không thể đăng nhập admin. Dừng test.');
    return;
  }

  // Test Job API
  await testJobImageUpload();

  console.log('\n' + '=' .repeat(60));
  console.log('✅ HOÀN THÀNH TEST CHỨC NĂNG UPLOAD VÀ UPDATE HÌNH ẢNH (LOCAL)');
}

// Chạy test
runImageUploadTests().catch(console.error);
