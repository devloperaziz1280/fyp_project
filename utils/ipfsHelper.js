const pinataSDK = require('@pinata/sdk')
const FormData = require('form-data')
const fs = require('fs')

// Initialize Pinata client
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
const PINATA_API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET
const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT

const uploadToIPFS = async (files) => {
  try {
    // Check if IPFS credentials are configured
    if (!PINATA_JWT) {
      throw new Error('Pinata credentials not configured')
    }

    // Handle both single file and multiple files
    const filesArray = Array.isArray(files) ? files : [files]
    const uploadedUrls = []

    for (const file of filesArray) {
      const formData = new FormData()
      formData.append('file', file)

      // Add metadata for better organization
      const metadata = JSON.stringify({
        name: file.name,
        keyvalues: {
          timestamp: Date.now(),
          type: file.type,
        },
      })
      formData.append('pinataMetadata', metadata)

      const response = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${PINATA_JWT}`,
        },
        maxContentLength: Infinity,
      })

      uploadedUrls.push(`https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`)
    }

    return filesArray.length === 1 ? uploadedUrls[0] : uploadedUrls
  } catch (error) {
    console.error('Error uploading to IPFS:', error)
    throw new Error(error.response?.data?.message || 'Error uploading to IPFS')
  }
}

const uploadMetadataToIPFS = async (metadata, options = {}) => {
  try {
    if (!PINATA_JWT) {
      throw new Error('Pinata credentials not configured')
    }

    const pinataContent = {
      pinataContent: metadata,
    }

    // Add optional metadata for better organization
    if (options.name || options.keyvalues) {
      pinataContent.pinataMetadata = {
        name: options.name,
        keyvalues: {
          timestamp: Date.now(),
          ...options.keyvalues,
        },
      }
    }

    const response = await axios({
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      data: pinataContent,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    })

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
  } catch (error) {
    console.error('Error uploading metadata to IPFS:', error)
    throw new Error(error.response?.data?.message || 'Error uploading metadata to IPFS')
  }
}

const testConnection = async () => {
  try {
    await axios({
      method: 'get',
      url: 'https://api.pinata.cloud/data/testAuthentication',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    })
    return true
  } catch (error) {
    console.error('Pinata connection failed:', error.message)
    return false
  }
}

module.exports = {
  uploadToIPFS,
  uploadMetadataToIPFS,
  testConnection,
}
