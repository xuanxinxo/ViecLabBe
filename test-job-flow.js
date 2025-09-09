// Test job flow: Admin tạo job -> Home hiển thị
const BASE_URL = 'https://vieclabbe.onrender.com';

async function testJobFlow() {
  console.log('🔄 Testing Job Flow: Admin Create -> Home Display');
  console.log('='.repeat(60));
  
  // Step 1: Login admin
  console.log('🔐 Step 1: Admin Login...');
  const loginResponse = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
  console.log('✅ Admin login success!');
  
  // Step 2: Check current jobs count on home
  console.log('\n📊 Step 2: Check current jobs on home...');
  const homeJobsResponse = await fetch(`${BASE_URL}/api/jobs`);
  const homeJobsData = await homeJobsResponse.json();
  const initialCount = homeJobsData.count || 0;
  console.log(`✅ Home currently has ${initialCount} jobs`);
  
  // Step 3: Create new job via admin
  console.log('\n➕ Step 3: Create new job via admin...');
  const newJobData = {
    title: 'Test Job from Admin Panel',
    company: 'Test Company',
    location: 'Ho Chi Minh City',
    type: 'Full-time',
    salary: '15-20M VND',
    description: 'This is a test job created from admin panel to verify it appears on home page',
    requirements: ['Node.js', 'React', 'TypeScript'],
    benefits: ['Health insurance', 'Remote work', 'Learning budget'],
    deadline: '2024-12-31',
    tags: ['test', 'admin', 'nodejs'],
    isRemote: true,
    img: 'https://example.com/test-image.jpg',
    status: 'active'
  };
  
  const createJobResponse = await fetch(`${BASE_URL}/api/admin/newjobs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newJobData)
  });
  
  const createJobData = await createJobResponse.json();
  if (createJobData.success) {
    console.log('✅ Job created successfully via admin!');
    console.log('Job ID:', createJobData.data.id);
  } else {
    console.log('❌ Failed to create job:', createJobData.message);
    return;
  }
  
  // Step 4: Check if job appears on home
  console.log('\n🏠 Step 4: Check if job appears on home...');
  const updatedHomeJobsResponse = await fetch(`${BASE_URL}/api/jobs`);
  const updatedHomeJobsData = await updatedHomeJobsResponse.json();
  const newCount = updatedHomeJobsData.count || 0;
  
  console.log(`✅ Home now has ${newCount} jobs`);
  console.log(`📈 Jobs increased by: ${newCount - initialCount}`);
  
  // Step 5: Verify the new job is in the list
  if (newCount > initialCount) {
    console.log('\n🎉 SUCCESS! New job appears on home page!');
    
    // Find the new job in the list
    const newJob = updatedHomeJobsData.data.find(job => 
      job.title === 'Test Job from Admin Panel'
    );
    
    if (newJob) {
      console.log('✅ Found the new job in home list:');
      console.log('   Title:', newJob.title);
      console.log('   Company:', newJob.company);
      console.log('   Location:', newJob.location);
      console.log('   Status:', newJob.status);
    }
  } else {
    console.log('\n❌ FAILED! New job does NOT appear on home page');
    console.log('This means admin jobs are not synced with home page');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🏁 Job Flow Test Completed!');
}

testJobFlow().catch(console.error);
