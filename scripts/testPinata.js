require('dotenv').config({ path: '.env.local' })
const pinataSDK = require('@pinata/sdk')

const testPinata = async () => {
  try {
    console.log('Testing Pinata connection...')

    const pinata = new pinataSDK(
      process.env.NEXT_PUBLIC_PINATA_API_KEY,
      process.env.NEXT_PUBLIC_PINATA_API_SECRET
    )

    const result = await pinata.testAuthentication()

    if (result.authenticated) {
      console.log('✅ Successfully connected to Pinata!')

      // Test JSON upload
      console.log('\nTesting metadata upload...')
      const metadata = {
        name: 'Test Metadata',
        description: 'This is a test',
        timestamp: Date.now(),
      }

      const uploadResult = await pinata.pinJSONToIPFS(metadata, {
        pinataMetadata: {
          name: 'test-upload',
        },
      })

      console.log('✅ Successfully uploaded test metadata!')
      console.log('IPFS Hash:', uploadResult.IpfsHash)
      console.log('View at:', `https://gateway.pinata.cloud/ipfs/${uploadResult.IpfsHash}`)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testPinata()
