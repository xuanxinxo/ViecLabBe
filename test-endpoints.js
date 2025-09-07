#!/usr/bin/env node

/**
 * Script để test các endpoints của ViecLab Backend
 * Sử dụng: node test-endpoints.js [base-url]
 * Ví dụ: node test-endpoints.js http://localhost:5000
 */

const http = require('http');
const https = require('https');

const baseUrl = process.argv[2] || 'http://localhost:5000';
const isHttps = baseUrl.startsWith('https');

const client = isHttps ? https : http;

const endpoints = [
  { path: '/', method: 'GET', name: 'Root endpoint' },
  { path: '/health', method: 'GET', name: 'Health check' },
  { path: '/api/jobs', method: 'GET', name: 'Get jobs' },
  { path: '/api/news', method: 'GET', name: 'Get news' },
  { path: '/api/newjobs', method: 'GET', name: 'Get new jobs' },
];

function makeRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint.path, baseUrl);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ViecLab-Test-Script'
      }
    };

    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          endpoint: endpoint.name,
          status: res.statusCode,
          headers: res.headers,
          data: data,
          success: res.statusCode >= 200 && res.statusCode < 300
        });
      });
    });

    req.on('error', (err) => {
      reject({
        endpoint: endpoint.name,
        error: err.message,
        success: false
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject({
        endpoint: endpoint.name,
        error: 'Request timeout',
        success: false
      });
    });

    req.end();
  });
}

async function runTests() {
  console.log(`🧪 Testing ViecLab Backend endpoints`);
  console.log(`📍 Base URL: ${baseUrl}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log('─'.repeat(60));

  const results = [];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.name}...`);
      const result = await makeRequest(endpoint);
      results.push(result);
      
      if (result.success) {
        console.log(`✅ ${endpoint.name}: ${result.status} OK`);
        if (result.data) {
          try {
            const json = JSON.parse(result.data);
            if (json.message) {
              console.log(`   Message: ${json.message}`);
            }
            if (json.status) {
              console.log(`   Status: ${json.status}`);
            }
          } catch (e) {
            // Not JSON, ignore
          }
        }
      } else {
        console.log(`❌ ${endpoint.name}: ${result.status} FAILED`);
      }
    } catch (error) {
      results.push(error);
      console.log(`❌ ${endpoint.name}: ERROR - ${error.error}`);
    }
    console.log('');
  }

  // Summary
  console.log('─'.repeat(60));
  console.log('📊 Test Summary:');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((successful / results.length) * 100).toFixed(1)}%`);
  
  if (failed > 0) {
    console.log('\n❌ Failed Tests:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.endpoint}: ${r.error || r.status}`);
    });
  }
  
  console.log(`\n⏰ Completed at: ${new Date().toISOString()}`);
  
  // Exit with error code if any tests failed
  process.exit(failed > 0 ? 1 : 0);
}

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run tests
runTests().catch(err => {
  console.error('❌ Test runner error:', err);
  process.exit(1);
});
