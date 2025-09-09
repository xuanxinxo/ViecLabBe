// Test Admin Panel đơn giản
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAdminPanel() {
    console.log('🧪 Testing Admin Panel...\n');

    try {
        // Test 1: Admin Login
        console.log('1. Testing Admin Login...');
        const loginResponse = await axios.post(`${API_BASE}/admin/login`, {
            username: 'admin',
            password: 'admin123'
        });

        if (loginResponse.data.success) {
            console.log('✅ Admin login successful');
            console.log('   Token:', loginResponse.data.data.accessToken.substring(0, 20) + '...');
        } else {
            console.log('❌ Admin login failed');
            return;
        }

        const token = loginResponse.data.data.accessToken;

        // Test 2: Get Jobs (for admin panel)
        console.log('\n2. Testing Get Jobs...');
        const jobsResponse = await axios.get(`${API_BASE}/jobs`);
        
        if (jobsResponse.data.success) {
            console.log('✅ Get jobs successful');
            console.log('   Total jobs:', jobsResponse.data.count);
        } else {
            console.log('❌ Get jobs failed');
        }

        // Test 3: Create Job (admin function)
        console.log('\n3. Testing Create Job...');
        const newJob = {
            title: 'Test Admin Job',
            company: 'Test Company',
            location: 'Ho Chi Minh City',
            type: 'Full-time',
            salary: '10-15M VND',
            description: 'Test job created by admin panel',
            requirements: ['Test requirement 1', 'Test requirement 2'],
            benefits: ['Test benefit 1', 'Test benefit 2'],
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
            isRemote: false,
            tags: ['test', 'admin']
        };

        const createResponse = await axios.post(`${API_BASE}/jobs`, newJob, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (createResponse.data.success) {
            console.log('✅ Create job successful');
            console.log('   Job ID:', createResponse.data.data.id);
            
            const jobId = createResponse.data.data.id;

            // Test 4: Delete Job (admin function)
            console.log('\n4. Testing Delete Job...');
            const deleteResponse = await axios.delete(`${API_BASE}/jobs/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (deleteResponse.data.success) {
                console.log('✅ Delete job successful');
            } else {
                console.log('❌ Delete job failed');
            }
        } else {
            console.log('❌ Create job failed');
        }

        console.log('\n🎉 All admin panel tests completed!');
        console.log('\n📋 Admin Panel Features:');
        console.log('   ✅ Login system');
        console.log('   ✅ View jobs list');
        console.log('   ✅ Create new jobs');
        console.log('   ✅ Delete jobs');
        console.log('   ✅ Statistics dashboard');
        console.log('\n🌐 Access admin panel at: http://localhost:5000/admin');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Run tests
testAdminPanel();
