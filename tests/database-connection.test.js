// Database connection test
const { testConnection, closeConnection } = require('./setup');

async function runConnectionTest() {
  console.log('🧪 Testing database connection...');
  
  const isConnected = await testConnection();
  
  if (isConnected) {
    console.log('✅ Database connection test PASSED!');
    console.log('📊 Your PostgreSQL database is working correctly.');
    console.log('🔗 Prisma client is properly configured.');
  } else {
    console.log('❌ Database connection test FAILED!');
    console.log('🔧 Please check your .env file and database settings.');
  }
  
  await closeConnection();
}

// Run the test
runConnectionTest().catch(console.error);
