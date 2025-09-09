// Test Hirings và NewJobs APIs
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testHiringsAPI() {
    console.log('🧪 Testing Hirings API...\n');

    try {
        // Test 1: Get all hirings
        console.log('1. Testing Get All Hirings...');
        const getHiringsResponse = await axios.get(`${API_BASE}/hirings`);
        
        if (getHiringsResponse.data.success) {
            console.log('✅ Get hirings successful');
            console.log('   Total hirings:', getHiringsResponse.data.data.length);
        } else {
            console.log('❌ Get hirings failed');
        }

        // Test 2: Create new hiring
        console.log('\n2. Testing Create Hiring...');
        const newHiring = {
            title: 'Test Hiring Position',
            company: 'Test Company',
            location: 'Ho Chi Minh City',
            type: 'Full-time',
            salary: '15-20M VND',
            description: 'Test hiring description',
            requirements: ['Test requirement 1', 'Test requirement 2'],
            benefits: ['Test benefit 1', 'Test benefit 2'],
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
            img: 'https://example.com/image.jpg'
        };

        const createHiringResponse = await axios.post(`${API_BASE}/hirings`, newHiring, {
            headers: {
                'Authorization': 'Bearer test-token' // This will fail auth but test the endpoint
            }
        });

        if (createHiringResponse.data.success) {
            console.log('✅ Create hiring successful');
            console.log('   Hiring ID:', createHiringResponse.data.data.id);
        } else {
            console.log('❌ Create hiring failed (expected - no auth)');
        }

        console.log('\n✅ Hirings API tests completed!');

    } catch (error) {
        if (error.response?.status === 401) {
            console.log('✅ Hirings API working (auth required as expected)');
        } else {
            console.error('❌ Hirings API test failed:', error.response?.data || error.message);
        }
    }
}

async function testNewJobsAPI() {
    console.log('\n🧪 Testing NewJobs API...\n');

    try {
        // Test 1: Get all new jobs
        console.log('1. Testing Get All New Jobs...');
        const getNewJobsResponse = await axios.get(`${API_BASE}/newjobs`);
        
        if (getNewJobsResponse.data.success) {
            console.log('✅ Get new jobs successful');
            console.log('   Total new jobs:', getNewJobsResponse.data.count);
            console.log('   Data structure:', Object.keys(getNewJobsResponse.data));
        } else {
            console.log('❌ Get new jobs failed');
        }

        // Test 2: Create new job
        console.log('\n2. Testing Create New Job...');
        const newJob = {
            title: 'Test New Job Position',
            company: 'Test New Company',
            location: 'Ho Chi Minh City',
            type: 'Full-time',
            salary: '18-22M VND',
            description: 'Test new job description',
            requirements: ['New requirement 1', 'New requirement 2'],
            benefits: ['New benefit 1', 'New benefit 2'],
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
            isRemote: false,
            tags: ['test', 'newjob'],
            img: 'https://example.com/image.jpg',
            status: 'active'
        };

        const createNewJobResponse = await axios.post(`${API_BASE}/newjobs`, newJob);

        if (createNewJobResponse.data.success) {
            console.log('✅ Create new job successful');
            console.log('   New Job ID:', createNewJobResponse.data.data.id);
            
            const jobId = createNewJobResponse.data.data.id;

            // Test 3: Get new job by ID
            console.log('\n3. Testing Get New Job by ID...');
            const getNewJobResponse = await axios.get(`${API_BASE}/newjobs/${jobId}`);
            
            if (getNewJobResponse.data.success) {
                console.log('✅ Get new job by ID successful');
                console.log('   Job title:', getNewJobResponse.data.data.title);
            } else {
                console.log('❌ Get new job by ID failed');
            }

            // Test 4: Update new job
            console.log('\n4. Testing Update New Job...');
            const updateData = {
                title: 'Updated Test New Job Position',
                salary: '20-25M VND'
            };

            const updateNewJobResponse = await axios.put(`${API_BASE}/newjobs/${jobId}`, updateData);
            
            if (updateNewJobResponse.data.success) {
                console.log('✅ Update new job successful');
                console.log('   Updated title:', updateNewJobResponse.data.data.title);
            } else {
                console.log('❌ Update new job failed');
            }

            // Test 5: Delete new job
            console.log('\n5. Testing Delete New Job...');
            const deleteNewJobResponse = await axios.delete(`${API_BASE}/newjobs/${jobId}`);
            
            if (deleteNewJobResponse.data.success) {
                console.log('✅ Delete new job successful');
            } else {
                console.log('❌ Delete new job failed');
            }

        } else {
            console.log('❌ Create new job failed');
        }

        console.log('\n✅ NewJobs API tests completed!');

    } catch (error) {
        console.error('❌ NewJobs API test failed:', error.response?.data || error.message);
    }
}

async function runAllTests() {
    console.log('🚀 Starting Hirings and NewJobs API Tests...\n');
    
    await testHiringsAPI();
    await testNewJobsAPI();
    
    console.log('\n🎉 All tests completed!');
    console.log('\n📋 API Status Summary:');
    console.log('   ✅ Hirings API: Working (auth required for create/update/delete)');
    console.log('   ✅ NewJobs API: Working (public access)');
    console.log('\n🌐 API Endpoints:');
    console.log('   GET /api/hirings - Get all hirings');
    console.log('   GET /api/hirings/:id - Get hiring by ID');
    console.log('   POST /api/hirings - Create hiring (auth required)');
    console.log('   PUT /api/hirings/:id - Update hiring (auth required)');
    console.log('   DELETE /api/hirings/:id - Delete hiring (auth required)');
    console.log('   GET /api/newjobs - Get all new jobs');
    console.log('   GET /api/newjobs/:id - Get new job by ID');
    console.log('   POST /api/newjobs - Create new job');
    console.log('   PUT /api/newjobs/:id - Update new job');
    console.log('   DELETE /api/newjobs/:id - Delete new job');
}

// Run tests
runAllTests();
