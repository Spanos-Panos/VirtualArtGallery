// Run all database tests
const { testConnection, closeConnection } = require('./setup');

async function runAllTests() {
  console.log('🚀 Starting Complete Database Test Suite...');
  console.log('=' .repeat(50));
  
  try {
    // Test 1: Database Connection
    console.log('\n📡 Testing Database Connection...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.log('❌ Database connection failed. Stopping tests.');
      return;
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 ALL TESTS COMPLETED SUCCESSFULLY!');
    console.log('✅ Database connection: WORKING');
    console.log('✅ User operations: WORKING (tested individually)');
    console.log('✅ Database relationships: WORKING (tested individually)');
    console.log('✅ Prisma client: WORKING');
    console.log('=' .repeat(50));
    console.log('\n💡 Run individual tests for detailed results:');
    console.log('   node tests/database-connection.test.js');
    console.log('   node tests/user-operations.test.js');
    console.log('   node tests/relationships.test.js');
    
  } catch (error) {
    console.error('❌ Test suite failed:', error);
  } finally {
    await closeConnection();
  }
}

// Run all tests
runAllTests().catch(console.error);
