// User operations test
const { prisma, cleanupTestData, closeConnection } = require('./setup');

async function testUserOperations() {
  console.log('🧪 Testing User CRUD operations...');
  
  try {
    // Test 1: Create a user
    console.log('📝 Test 1: Creating a test user...');
    const testUser = await prisma.user.create({
      data: {
        email: 'test@artgallery.com',
        name: 'Test Artist',
        bio: 'This is a test user for database verification',
        role: 'ARTIST'
      }
    });
    console.log('✅ User created successfully:', testUser.name);
    
    // Test 2: Read the user
    console.log('📖 Test 2: Reading the test user...');
    const foundUser = await prisma.user.findUnique({
      where: { email: 'test@artgallery.com' }
    });
    console.log('✅ User found successfully:', foundUser.name);
    
    // Test 3: Update the user
    console.log('✏️ Test 3: Updating the test user...');
    const updatedUser = await prisma.user.update({
      where: { id: testUser.id },
      data: { bio: 'Updated bio for test user' }
    });
    console.log('✅ User updated successfully:', updatedUser.bio);
    
    // Test 4: List all users
    console.log('📋 Test 4: Listing all users...');
    const allUsers = await prisma.user.findMany();
    console.log('✅ Found', allUsers.length, 'users in database');
    
    console.log('🎉 All User operations tests PASSED!');
    return true;
    
  } catch (error) {
    console.error('❌ User operations test FAILED:', error);
    return false;
  }
}

async function runUserTests() {
  console.log('🚀 Starting User Operations Tests...');
  
  const success = await testUserOperations();
  
  if (success) {
    console.log('✅ User operations test completed successfully!');
  } else {
    console.log('❌ User operations test failed!');
  }
  
  // Clean up test data
  await cleanupTestData();
  await closeConnection();
}

// Run the tests
runUserTests().catch(console.error);
