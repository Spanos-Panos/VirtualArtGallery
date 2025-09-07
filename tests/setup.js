// Test setup and configuration
const { PrismaClient } = require('../src/generated/prisma');

// Create a test Prisma client
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Test database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Clean up test data
async function cleanupTestData() {
  try {
    // Delete test data in reverse order of dependencies
    await prisma.galleryArtwork.deleteMany({
      where: {
        OR: [
          { gallery: { name: { contains: 'TEST' } } },
          { artwork: { title: { contains: 'TEST' } } }
        ]
      }
    });
    
    await prisma.gallery.deleteMany({
      where: { name: { contains: 'TEST' } }
    });
    
    await prisma.artwork.deleteMany({
      where: { title: { contains: 'TEST' } }
    });
    
    await prisma.category.deleteMany({
      where: { name: { contains: 'TEST' } }
    });
    
    await prisma.user.deleteMany({
      where: { email: { contains: 'test@' } }
    });
    
    console.log('🧹 Test data cleaned up successfully!');
  } catch (error) {
    console.error('❌ Error cleaning up test data:', error);
  }
}

// Close database connection
async function closeConnection() {
  await prisma.$disconnect();
}

module.exports = {
  prisma,
  testConnection,
  cleanupTestData,
  closeConnection
};
