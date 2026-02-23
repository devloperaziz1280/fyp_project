require('dotenv').config({ path: '.env.local' })
const pinataSDK = require('@pinata/sdk')
const fs = require('fs')
const path = require('path')

const createTestRoom = async () => {
  try {
    console.log('Creating test room...')

    const pinata = new pinataSDK(
      process.env.NEXT_PUBLIC_PINATA_API_KEY,
      process.env.NEXT_PUBLIC_PINATA_API_SECRET
    )

    // 1. Upload test images
    console.log('\n1. Uploading test images...')
    const imageDir = path.join(__dirname, '../public/test-images')
    const imageFiles = fs
      .readdirSync(imageDir)
      .filter((file) => file.match(/\.(jpg|jpeg|png)$/i))
      .map((file) => ({
        name: file,
        path: path.join(imageDir, file),
      }))

    const imageUrls = []
    for (const file of imageFiles) {
      const stream = fs.createReadStream(file.path)
      const result = await pinata.pinFileToIPFS(stream, {
        pinataMetadata: {
          name: `room-image-${file.name}`,
          keyvalues: {
            type: 'room-image',
          },
        },
      })
      imageUrls.push(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
      console.log(`✅ Uploaded image: ${file.name}`)
    }

    // 2. Create and upload room metadata
    console.log('\n2. Creating room metadata...')
    const roomMetadata = {
      name: 'Luxury Beachfront Apartment',
      description: 'Modern beachfront apartment with stunning ocean views and full amenities',
      location: 'Miami Beach, Florida',
      price: '0.5', // in ETH
      rooms: 3,
      amenities: [
        'Ocean View',
        'Private Balcony',
        'WiFi',
        'Full Kitchen',
        'Air Conditioning',
        'Parking',
      ],
      images: imageUrls,
      createdAt: Date.now(),
    }

    console.log('\n3. Uploading room metadata to IPFS...')
    const metadataResult = await pinata.pinJSONToIPFS(roomMetadata, {
      pinataMetadata: {
        name: 'luxury-beach-villa',
        keyvalues: {
          type: 'room',
          price: roomMetadata.price,
          location: roomMetadata.location,
        },
      },
    })

    console.log('\n✅ Success! Room created on IPFS')
    console.log('Metadata URL:', `https://gateway.pinata.cloud/ipfs/${metadataResult.IpfsHash}`)
    console.log('\nRoom Images:')
    imageUrls.forEach((url, index) => {
      console.log(`Image ${index + 1}:`, url)
    })

    // Return values needed for smart contract interaction
    return {
      metadataHash: metadataResult.IpfsHash,
      price: roomMetadata.price,
      imageUrls,
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

createTestRoom()
