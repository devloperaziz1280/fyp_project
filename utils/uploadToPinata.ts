const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT
const PINATA_GATEWAY =
  process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'https://gateway.pinata.cloud/ipfs'

export async function uploadToPinata(file: File): Promise<string> {
  if (!PINATA_JWT) {
    throw new Error('Pinata credentials not configured')
  }

  const formData = new FormData()
  formData.append('file', file)

  const metadata = JSON.stringify({
    name: file.name,
    keyvalues: {
      timestamp: Date.now().toString(),
      type: file.type,
    },
  })
  formData.append('pinataMetadata', metadata)

  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const message =
      (errorData as { error?: string }).error ||
      (errorData as { message?: string }).message ||
      'Failed to upload image to Pinata'
    throw new Error(message)
  }

  const data = (await response.json()) as { IpfsHash: string }
  return `${PINATA_GATEWAY}/${data.IpfsHash}`
}
