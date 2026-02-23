require('dotenv').config({ path: '.env.local' })
const { testConnection, uploadMetadataToIPFS } = require('../utils/ipfsHelper')

const testIPFSSetup = async () => {
  try {
    // Test 1: Connection
    console.log('Testing Pinata connection...')
    const isConnected = await testConnection()
    if (!isConnected) {
      throw new Error('Failed to connect to Pinata')
    }
    console.log('✅ Pinata connection successful!')

    // Test 2: Upload metadata
    console.log('\nTesting metadata upload...')
    const testMetadata = {
      name: 'Test Room',
      description: 'This is a test room',
      test: true,
      timestamp: Date.now(),
    }

    const metadataUrl = await uploadMetadataToIPFS(testMetadata, {
      name: 'test-metadata',
      keyvalues: {
        type: 'test',
      },
    })
    console.log('✅ Metadata upload successful!')
    console.log('Metadata URL:', metadataUrl)
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  }
}

testIPFSSetup()
