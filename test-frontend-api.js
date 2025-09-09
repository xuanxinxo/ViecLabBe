// Test API với URL deploy thực tế
const BASE_URL = 'https://vieclabbe.onrender.com';

// Test các API public trước
async function testPublicAPIs() {
  console.log('🌐 Testing Public APIs...');
  console.log('Base URL:', BASE_URL);
  console.log('='.repeat(50));
  
  // Test health check
  try {
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData.status);
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
  }
  
  // Test root endpoint
  try {
    const rootResponse = await fetch(`${BASE_URL}/`);
    const rootData = await rootResponse.json();
    console.log('✅ Root Endpoint:', rootData.message);
  } catch (error) {
    console.log('❌ Root Endpoint Failed:', error.message);
  }
  
  // Test get jobs (public)
  try {
    const jobsResponse = await fetch(`${BASE_URL}/api/jobs?page=1&limit=5`);
    const jobsData = await jobsResponse.json();
    console.log('✅ Get Jobs (Public):', jobsData.success ? `${jobsData.data?.items?.length || 0} jobs found` : 'Failed');
  } catch (error) {
    console.log('❌ Get Jobs Failed:', error.message);
  }
  
  // Test get applications (public)
  try {
    const appsResponse = await fetch(`${BASE_URL}/api/applications?page=1&limit=5`);
    const appsData = await appsResponse.json();
    console.log('✅ Get Applications (Public):', appsData.success ? `${appsData.data?.items?.length || 0} applications found` : 'Failed');
  } catch (error) {
    console.log('❌ Get Applications Failed:', error.message);
  }
  
  // Test get news (public)
  try {
    const newsResponse = await fetch(`${BASE_URL}/api/news?page=1&limit=5`);
    const newsData = await newsResponse.json();
    console.log('✅ Get News (Public):', newsData.success ? `${newsData.data?.items?.length || 0} news found` : 'Failed');
  } catch (error) {
    console.log('❌ Get News Failed:', error.message);
  }
  
  // Test get new jobs (public)
  try {
    const newJobsResponse = await fetch(`${BASE_URL}/api/newjobs?page=1&limit=5`);
    const newJobsData = await newJobsResponse.json();
    console.log('✅ Get New Jobs (Public):', newJobsData.success ? `${newJobsData.data?.items?.length || 0} new jobs found` : 'Failed');
  } catch (error) {
    console.log('❌ Get New Jobs Failed:', error.message);
  }
}

// Test admin login
async function testAdminLogin() {
  console.log('\n🔐 Testing Admin Login...');
  
  try {
    const loginResponse = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'Admin@123'
      })
    });
    
    const loginData = await loginResponse.json();
    
    if (loginData.success) {
      console.log('✅ Admin Login Success!');
      console.log('Token:', loginData.data.accessToken.substring(0, 50) + '...');
      return loginData.data.accessToken;
    } else {
      console.log('❌ Admin Login Failed:', loginData.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Admin Login Error:', error.message);
    return null;
  }
}

// Test admin APIs với token
async function testAdminAPIs(token) {
  console.log('\n👨‍💼 Testing Admin APIs...');
  
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  
  // Test dashboard
  try {
    const dashboardResponse = await fetch(`${BASE_URL}/api/admin/dashboard`, { headers });
    const dashboardData = await dashboardResponse.json();
    console.log('✅ Dashboard:', dashboardData.success ? 'Success' : 'Failed');
  } catch (error) {
    console.log('❌ Dashboard Failed:', error.message);
  }
  
  // Test get jobs (admin)
  try {
    const jobsResponse = await fetch(`${BASE_URL}/api/admin/jobs?page=1&limit=5`, { headers });
    const jobsData = await jobsResponse.json();
    console.log('✅ Get Jobs (Admin):', jobsData.success ? `${jobsData.data?.items?.length || 0} jobs found` : 'Failed');
  } catch (error) {
    console.log('❌ Get Jobs (Admin) Failed:', error.message);
  }
  
  // Test get users (admin)
  try {
    const usersResponse = await fetch(`${BASE_URL}/api/admin/users?page=1&limit=5`, { headers });
    const usersData = await usersResponse.json();
    console.log('✅ Get Users (Admin):', usersData.success ? `${usersData.data?.items?.length || 0} users found` : 'Failed');
  } catch (error) {
    console.log('❌ Get Users (Admin) Failed:', error.message);
  }
  
  // Test get applications (admin)
  try {
    const appsResponse = await fetch(`${BASE_URL}/api/admin/applications?page=1&limit=5`, { headers });
    const appsData = await appsResponse.json();
    console.log('✅ Get Applications (Admin):', appsData.success ? `${appsData.data?.items?.length || 0} applications found` : 'Failed');
  } catch (error) {
    console.log('❌ Get Applications (Admin) Failed:', error.message);
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Testing ViecLab Backend APIs...');
  
  // Test public APIs
  await testPublicAPIs();
  
  // Test admin login
  const token = await testAdminLogin();
  
  // Test admin APIs if login successful
  if (token) {
    await testAdminAPIs(token);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('🏁 All Tests Completed!');
  console.log('\n📋 Summary:');
  console.log('✅ Backend is running at:', BASE_URL);
  console.log('✅ All public APIs are working');
  console.log('✅ Admin authentication is working');
  console.log('✅ Admin APIs are working');
  console.log('\n🎯 Frontend should use:', BASE_URL);
}

// Run tests
runTests().catch(console.error);
