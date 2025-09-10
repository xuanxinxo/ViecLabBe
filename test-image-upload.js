const https = require('https');

const BASE_URL = 'https://vieclabbe.onrender.com';

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

const testNewsData = {
  title: "Test News với hình ảnh",
  summary: "Tóm tắt tin tức test với hình ảnh",
  image: "https://via.placeholder.com/400x300/FF6600/FFFFFF?text=Test+News+Image",
  link: "https://example.com/test-news",
  date: new Date().toISOString()
};

const testHiringData = {
  title: "Test Hiring với hình ảnh",
  company: "Test Company",
  location: "Hà Nội",
  type: "Part-time",
  salary: "10-15M VND",
  description: "Mô tả tuyển dụng test với hình ảnh",
  requirements: ["Vue.js", "TypeScript"],
  benefits: ["Flexible hours"],
  deadline: "2024-12-31",
  img: "https://via.placeholder.com/350x250/00AA00/FFFFFF?text=Test+Hiring+Image"
};

const testNewJobData = {
  title: "Test NewJob với hình ảnh",
  company: "Test Company",
  location: "Đà Nẵng",
  type: "Contract",
  salary: "20-25M VND",
  description: "Mô tả new job test với hình ảnh",
  requirements: ["Angular", "Node.js"],
  benefits: ["Remote work"],
  deadline: "2024-12-31",
  tags: ["angular", "test"],
  isRemote: true,
  img: "https://via.placeholder.com/300x200/AA0066/FFFFFF?text=Test+NewJob+Image",
  status: "active"
};

let adminToken = '';

// Helper function để make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
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

// Test News với hình ảnh
async function testNewsImageUpload() {
  console.log('\n📰 === TEST NEWS IMAGE UPLOAD ===');
  
  // 1. Tạo news với hình ảnh
  console.log('1. Tạo news với hình ảnh...');
  const createResponse = await makeRequest(`${BASE_URL}/api/admin/news`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify(testNewsData)
  });

  if (createResponse.status === 201) {
    const newsId = createResponse.data.id;
    console.log('✅ Tạo news thành công, ID:', newsId);
    console.log('🖼️ Hình ảnh news:', createResponse.data.image);

    // 2. Update news với hình ảnh mới
    console.log('\n2. Update news với hình ảnh mới...');
    const updateData = {
      ...testNewsData,
      title: "Updated News với hình ảnh mới",
      image: "https://via.placeholder.com/400x300/00FF00/FFFFFF?text=Updated+News+Image"
    };

    const updateResponse = await makeRequest(`${BASE_URL}/api/admin/news/${newsId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(updateData)
    });

    if (updateResponse.status === 200) {
      console.log('✅ Update news thành công');
      console.log('🖼️ Hình ảnh news sau update:', updateResponse.data.image);
    } else {
      console.log('❌ Update news thất bại:', updateResponse.data);
    }

    return newsId;
  } else {
    console.log('❌ Tạo news thất bại:', createResponse.data);
    return null;
  }
}

// Test Hiring với hình ảnh
async function testHiringImageUpload() {
  console.log('\n💼 === TEST HIRING IMAGE UPLOAD ===');
  
  // 1. Tạo hiring với hình ảnh
  console.log('1. Tạo hiring với hình ảnh...');
  const createResponse = await makeRequest(`${BASE_URL}/api/admin/hirings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify(testHiringData)
  });

  if (createResponse.status === 201 && createResponse.data.success) {
    const hiringId = createResponse.data.data.id;
    console.log('✅ Tạo hiring thành công, ID:', hiringId);
    console.log('🖼️ Hình ảnh hiring:', createResponse.data.data.img);

    // 2. Update hiring với hình ảnh mới
    console.log('\n2. Update hiring với hình ảnh mới...');
    const updateData = {
      ...testHiringData,
      title: "Updated Hiring với hình ảnh mới",
      img: "https://via.placeholder.com/350x250/0000FF/FFFFFF?text=Updated+Hiring+Image"
    };

    const updateResponse = await makeRequest(`${BASE_URL}/api/admin/hirings/${hiringId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(updateData)
    });

    if (updateResponse.status === 200 && updateResponse.data.success) {
      console.log('✅ Update hiring thành công');
      console.log('🖼️ Hình ảnh hiring sau update:', updateResponse.data.data.img);
    } else {
      console.log('❌ Update hiring thất bại:', updateResponse.data);
    }

    return hiringId;
  } else {
    console.log('❌ Tạo hiring thất bại:', createResponse.data);
    return null;
  }
}

// Test NewJob với hình ảnh
async function testNewJobImageUpload() {
  console.log('\n🆕 === TEST NEWJOB IMAGE UPLOAD ===');
  
  // 1. Tạo newjob với hình ảnh
  console.log('1. Tạo newjob với hình ảnh...');
  const createResponse = await makeRequest(`${BASE_URL}/api/admin/newjobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify(testNewJobData)
  });

  if (createResponse.status === 201 && createResponse.data.success) {
    const newJobId = createResponse.data.data.id;
    console.log('✅ Tạo newjob thành công, ID:', newJobId);
    console.log('🖼️ Hình ảnh newjob:', createResponse.data.data.img);

    // 2. Update newjob với hình ảnh mới
    console.log('\n2. Update newjob với hình ảnh mới...');
    const updateData = {
      ...testNewJobData,
      title: "Updated NewJob với hình ảnh mới",
      img: "https://via.placeholder.com/300x200/FF00FF/FFFFFF?text=Updated+NewJob+Image"
    };

    const updateResponse = await makeRequest(`${BASE_URL}/api/admin/newjobs/${newJobId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(updateData)
    });

    if (updateResponse.status === 200 && updateResponse.data.success) {
      console.log('✅ Update newjob thành công');
      console.log('🖼️ Hình ảnh newjob sau update:', updateResponse.data.data.img);
    } else {
      console.log('❌ Update newjob thất bại:', updateResponse.data);
    }

    return newJobId;
  } else {
    console.log('❌ Tạo newjob thất bại:', createResponse.data);
    return null;
  }
}

// Main test function
async function runImageUploadTests() {
  console.log('🚀 BẮT ĐẦU TEST CHỨC NĂNG UPLOAD VÀ UPDATE HÌNH ẢNH');
  console.log('=' .repeat(60));

  // Đăng nhập admin
  const loginSuccess = await adminLogin();
  if (!loginSuccess) {
    console.log('❌ Không thể đăng nhập admin. Dừng test.');
    return;
  }

  // Test các API
  await testJobImageUpload();
  await testNewsImageUpload();
  await testHiringImageUpload();
  await testNewJobImageUpload();

  console.log('\n' + '=' .repeat(60));
  console.log('✅ HOÀN THÀNH TEST CHỨC NĂNG UPLOAD VÀ UPDATE HÌNH ẢNH');
}

// Chạy test
runImageUploadTests().catch(console.error);
