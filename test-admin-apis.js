// Test Admin APIs với link deploy
const BASE_URL = 'https://vieclabbe.onrender.com'; // Link deploy thực tế

// Test data
const testData = {
  adminLogin: {
    username: 'admin',
    password: 'Admin@123'
  },
  newJob: {
    title: 'Test Job from API',
    company: 'Test Company',
    location: 'Ho Chi Minh City',
    type: 'Full-time',
    salary: '15-20M VND',
    description: 'Test job description for API testing',
    requirements: ['Node.js', 'React', 'TypeScript'],
    benefits: ['Health insurance', 'Remote work'],
    deadline: '2024-12-31',
    tags: ['test', 'api', 'nodejs'],
    isRemote: true,
    img: 'https://example.com/test-image.jpg',
    status: 'active'
  },
  newApplication: {
    name: 'Test Applicant',
    email: 'test@example.com',
    phone: '0123456789',
    message: 'Test application message',
    cv: 'https://example.com/test-cv.pdf',
    jobId: 'test-job-id'
  }
};

let adminToken = '';

// Helper function để gọi API
async function callAPI(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    return {
      status: response.status,
      success: response.ok,
      data: data
    };
  } catch (error) {
    return {
      status: 0,
      success: false,
      error: error.message
    };
  }
}

// Test functions
async function testAdminLogin() {
  console.log('🔐 Testing Admin Login...');
  const result = await callAPI(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    body: JSON.stringify(testData.adminLogin)
  });
  
  if (result.success && result.data.success) {
    adminToken = result.data.data.accessToken;
    console.log('✅ Admin Login Success!');
    console.log('Token:', adminToken.substring(0, 50) + '...');
    return true;
  } else {
    console.log('❌ Admin Login Failed:', result.data?.message || result.error);
    return false;
  }
}

async function testDashboard() {
  console.log('\n📊 Testing Dashboard...');
  const result = await callAPI(`${BASE_URL}/api/admin/dashboard`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  
  if (result.success) {
    console.log('✅ Dashboard Success!');
    console.log('Stats:', JSON.stringify(result.data.data, null, 2));
  } else {
    console.log('❌ Dashboard Failed:', result.data?.message || result.error);
  }
}

async function testGetUsers() {
  console.log('\n👥 Testing Get Users...');
  const result = await callAPI(`${BASE_URL}/api/admin/users?page=1&limit=5`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  
  if (result.success) {
    console.log('✅ Get Users Success!');
    console.log('Users count:', result.data.data?.items?.length || 0);
  } else {
    console.log('❌ Get Users Failed:', result.data?.message || result.error);
  }
}

async function testGetJobs() {
  console.log('\n💼 Testing Get Jobs...');
  const result = await callAPI(`${BASE_URL}/api/admin/jobs?page=1&limit=5`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  
  if (result.success) {
    console.log('✅ Get Jobs Success!');
    console.log('Jobs count:', result.data.data?.items?.length || 0);
  } else {
    console.log('❌ Get Jobs Failed:', result.data?.message || result.error);
  }
}

async function testCreateJob() {
  console.log('\n➕ Testing Create Job...');
  const result = await callAPI(`${BASE_URL}/api/admin/jobs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify(testData.newJob)
  });
  
  if (result.success) {
    console.log('✅ Create Job Success!');
    console.log('Created Job ID:', result.data.data?.id);
    return result.data.data?.id;
  } else {
    console.log('❌ Create Job Failed:', result.data?.message || result.error);
    return null;
  }
}

async function testGetApplications() {
  console.log('\n📝 Testing Get Applications...');
  const result = await callAPI(`${BASE_URL}/api/admin/applications?page=1&limit=5`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  
  if (result.success) {
    console.log('✅ Get Applications Success!');
    console.log('Applications count:', result.data.data?.items?.length || 0);
  } else {
    console.log('❌ Get Applications Failed:', result.data?.message || result.error);
  }
}

async function testGetNewJobs() {
  console.log('\n🆕 Testing Get New Jobs...');
  const result = await callAPI(`${BASE_URL}/api/admin/newjobs?page=1&limit=5`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  
  if (result.success) {
    console.log('✅ Get New Jobs Success!');
    console.log('New Jobs count:', result.data.data?.items?.length || 0);
  } else {
    console.log('❌ Get New Jobs Failed:', result.data?.message || result.error);
  }
}

async function testCreateNewJob() {
  console.log('\n➕ Testing Create New Job...');
  const result = await callAPI(`${BASE_URL}/api/admin/newjobs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify(testData.newJob)
  });
  
  if (result.success) {
    console.log('✅ Create New Job Success!');
    console.log('Created New Job ID:', result.data.data?.id);
    return result.data.data?.id;
  } else {
    console.log('❌ Create New Job Failed:', result.data?.message || result.error);
    return null;
  }
}

async function testHealthCheck() {
  console.log('🏥 Testing Health Check...');
  const result = await callAPI(`${BASE_URL}/health`);
  
  if (result.success) {
    console.log('✅ Health Check Success!');
    console.log('Status:', result.data.status);
    console.log('Uptime:', result.data.uptime + 's');
  } else {
    console.log('❌ Health Check Failed:', result.error);
  }
}

// Main test function
async function runAllTests() {
  console.log('🚀 Starting Admin API Tests...');
  console.log('Base URL:', BASE_URL);
  console.log('='.repeat(50));
  
  // Test health check first
  await testHealthCheck();
  
  // Test admin login
  const loginSuccess = await testAdminLogin();
  
  if (loginSuccess) {
    // Test all admin endpoints
    await testDashboard();
    await testGetUsers();
    await testGetJobs();
    await testCreateJob();
    await testGetApplications();
    await testGetNewJobs();
    await testCreateNewJob();
  } else {
    console.log('\n❌ Cannot proceed with admin tests - Login failed');
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('🏁 Admin API Tests Completed!');
}

// Run tests
runAllTests().catch(console.error);
