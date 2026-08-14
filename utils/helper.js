export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'

  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
  const value = Number(timestamp)
  // Solidity block.timestamp is in seconds; JS Date expects milliseconds
  const ms = value < 1e12 ? value * 1000 : value
  const date = new Date(ms)

  if (Number.isNaN(date.getTime())) return 'N/A'
  return date.toLocaleDateString('en-US', options)
}

export const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

export const normalizeImages = (images) => {
  if (Array.isArray(images)) {
    return images.map((url) => String(url).trim()).filter(Boolean)
  }

  if (typeof images === 'string') {
    return images
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean)
  }

  return []
}

export const isIpfsUrl = (url) =>
  typeof url === 'string' &&
  (url.includes('/ipfs/') ||
    url.includes('gateway.pinata.cloud') ||
    url.includes('ipfs.io') ||
    url.includes('mypinata.cloud'))
