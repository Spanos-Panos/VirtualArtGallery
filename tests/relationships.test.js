// Database relationships test
const { prisma, cleanupTestData, closeConnection } = require('./setup');

async function testRelationships() {
  console.log('🧪 Testing database relationships...');
  
  try {
    // Test 1: Create a test user (artist)
    console.log('👤 Test 1: Creating test artist...');
    const artist = await prisma.user.create({
      data: {
        email: 'test-artist@artgallery.com',
        name: 'Test Artist',
        role: 'ARTIST'
      }
    });
    console.log('✅ Artist created:', artist.name);
    
    // Test 2: Create a test category
    console.log('🏷️ Test 2: Creating test category...');
    const category = await prisma.category.create({
      data: {
        name: 'TEST Digital Art',
        description: 'Test category for digital artwork'
      }
    });
    console.log('✅ Category created:', category.name);
    
    // Test 3: Create artwork linked to artist and category
    console.log('🎨 Test 3: Creating artwork with relationships...');
    const artwork = await prisma.artwork.create({
      data: {
        title: 'TEST Sunset Painting',
        description: 'A beautiful test sunset',
        imageUrl: 'https://example.com/sunset.jpg',
        price: 100.00,
        dimensions: '1920x1080',
        artistId: artist.id,
        categoryId: category.id
      }
    });
    console.log('✅ Artwork created:', artwork.title);
    
    // Test 4: Create a gallery
    console.log('🏛️ Test 4: Creating test gallery...');
    const gallery = await prisma.gallery.create({
      data: {
        name: 'TEST Modern Art Gallery',
        description: 'A test gallery for modern art',
        ownerId: artist.id
      }
    });
    console.log('✅ Gallery created:', gallery.name);
    
    // Test 5: Add artwork to gallery (many-to-many relationship)
    console.log('🔗 Test 5: Adding artwork to gallery...');
    const galleryArtwork = await prisma.galleryArtwork.create({
      data: {
        galleryId: gallery.id,
        artworkId: artwork.id
      }
    });
    console.log('✅ Artwork added to gallery');
    
    // Test 6: Test relationship queries
    console.log('🔍 Test 6: Testing relationship queries...');
    
    // Get artist with their artworks
    const artistWithArtworks = await prisma.user.findUnique({
      where: { id: artist.id },
      include: {
        artworks: true,
        galleries: true
      }
    });
    console.log('✅ Artist has', artistWithArtworks.artworks.length, 'artworks');
    console.log('✅ Artist has', artistWithArtworks.galleries.length, 'galleries');
    
    // Get artwork with artist and category
    const artworkWithDetails = await prisma.artwork.findUnique({
      where: { id: artwork.id },
      include: {
        artist: true,
        category: true,
        galleries: {
          include: {
            gallery: true
          }
        }
      }
    });
    console.log('✅ Artwork artist:', artworkWithDetails.artist.name);
    console.log('✅ Artwork category:', artworkWithDetails.category.name);
    console.log('✅ Artwork in', artworkWithDetails.galleries.length, 'galleries');
    
    console.log('🎉 All relationship tests PASSED!');
    console.log('🔗 Database relationships are working correctly!');
    return true;
    
  } catch (error) {
    console.error('❌ Relationship test FAILED:', error);
    return false;
  }
}

async function runRelationshipTests() {
  console.log('🚀 Starting Database Relationships Tests...');
  
  const success = await testRelationships();
  
  if (success) {
    console.log('✅ All relationship tests completed successfully!');
    console.log('📊 Your database design is working perfectly!');
  } else {
    console.log('❌ Relationship tests failed!');
  }
  
  // Clean up test data
  await cleanupTestData();
  await closeConnection();
}

// Run the tests
runRelationshipTests().catch(console.error);
