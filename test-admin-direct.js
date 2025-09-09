// Test Admin API trực tiếp
const BASE_URL = 'https://vieclabbe.onrender.com';

async function testAdminAPI() {
  console.log('🔐 Step 1: Admin Login...');
  
  // Login admin
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
  
  if (!loginData.success) {
    console.log('❌ Login failed:', loginData.message);
    return;
  }
  
  const token = loginData.data.accessToken;
  console.log('✅ Login success!');
  console.log('Token:', token.substring(0, 50) + '...');
  
  console.log('\n👨‍💼 Step 2: Test Admin Jobs API...');
  
  // Test admin jobs API
  const jobsResponse = await fetch(`${BASE_URL}/api/admin/jobs?page=1&limit=10`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  const jobsData = await jobsResponse.json();
  
  if (jobsData.success) {
    console.log('✅ Admin Jobs API Success!');
    console.log('Total jobs:', jobsData.data?.items?.length || 0);
    console.log('Pagination:', jobsData.data?.pagination);
    
    if (jobsData.data?.items?.length > 0) {
      console.log('\n📋 Sample job:');
      console.log('Title:', jobsData.data.items[0].title);
      console.log('Company:', jobsData.data.items[0].company);
      console.log('Location:', jobsData.data.items[0].location);
    }
  } else {
    console.log('❌ Admin Jobs API Failed:', jobsData.message);
  }
  
  console.log('\n📊 Step 3: Compare with Public API...');
  
  // Test public jobs API for comparison
  const publicJobsResponse = await fetch(`${BASE_URL}/api/jobs?page=1&limit=10`);
  const publicJobsData = await publicJobsResponse.json();
  
  if (publicJobsData.success) {
    console.log('✅ Public Jobs API Success!');
    console.log('Total jobs:', publicJobsData.count || 0);
  } else {
    console.log('❌ Public Jobs API Failed:', publicJobsData.message);
  }
  
  console.log('\n🎯 Summary:');
  console.log('Public API jobs count:', publicJobsData.count || 0);
  console.log('Admin API jobs count:', jobsData.data?.items?.length || 0);
  console.log('Difference:', (publicJobsData.count || 0) - (jobsData.data?.items?.length || 0));
}

testAdminAPI().catch(console.error);
