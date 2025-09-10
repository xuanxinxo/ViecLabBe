// Test deployment endpoints
const axios = require('axios');

const API_BASE = 'https://vieclabbe.onrender.com';

async function testDeployment() {
    console.log('🧪 Testing Deployment...\n');

    try {
        // Test 1: Health Check
        console.log('1. Testing Health Check...');
        try {
            const healthResponse = await axios.get(`${API_BASE}/health`);
            console.log('✅ Health check successful');
            console.log('   Status:', healthResponse.data.status);
            console.log('   Database:', healthResponse.data.database);
            console.log('   Uptime:', healthResponse.data.uptime);
        } catch (error) {
            console.log('❌ Health check failed');
            console.log('   Error:', error.response?.data || error.message);
        }

        // Test 2: Root endpoint
        console.log('\n2. Testing Root Endpoint...');
        try {
            const rootResponse = await axios.get(`${API_BASE}/`);
            console.log('✅ Root endpoint successful');
            console.log('   Message:', rootResponse.data.message);
        } catch (error) {
            console.log('❌ Root endpoint failed');
            console.log('   Error:', error.response?.data || error.message);
        }

        // Test 3: Jobs API
        console.log('\n3. Testing Jobs API...');
        try {
            const jobsResponse = await axios.get(`${API_BASE}/api/jobs`);
            console.log('✅ Jobs API successful');
            console.log('   Success:', jobsResponse.data.success);
            console.log('   Count:', jobsResponse.data.count);
        } catch (error) {
            console.log('❌ Jobs API failed');
            console.log('   Status:', error.response?.status);
            console.log('   Error:', error.response?.data || error.message);
        }

        // Test 4: Hirings API
        console.log('\n4. Testing Hirings API...');
        try {
            const hiringsResponse = await axios.get(`${API_BASE}/api/hirings`);
            console.log('✅ Hirings API successful');
            console.log('   Success:', hiringsResponse.data.success);
            console.log('   Data length:', hiringsResponse.data.data?.length || 0);
        } catch (error) {
            console.log('❌ Hirings API failed');
            console.log('   Status:', error.response?.status);
            console.log('   Error:', error.response?.data || error.message);
        }

        // Test 5: NewJobs API
        console.log('\n5. Testing NewJobs API...');
        try {
            const newJobsResponse = await axios.get(`${API_BASE}/api/newjobs`);
            console.log('✅ NewJobs API successful');
            console.log('   Success:', newJobsResponse.data.success);
            console.log('   Count:', newJobsResponse.data.count);
        } catch (error) {
            console.log('❌ NewJobs API failed');
            console.log('   Status:', error.response?.status);
            console.log('   Error:', error.response?.data || error.message);
        }

        console.log('\n🎉 Deployment test completed!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run tests
testDeployment();
