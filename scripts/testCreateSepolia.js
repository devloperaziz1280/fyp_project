require('dotenv').config({ path: '.env.local' })
const { ethers } = require('ethers')
const fs = require('fs')
const deRentersAbi = require('../artifacts/contracts/de_renters.sol/fyp_contract.json')

const TEST_IMAGES = [
  'https://gateway.pinata.cloud/ipfs/QmQ9WEgDweXcbZScXChcpDdT1PWYqFDvugTv7JRYHSQnAg',
  'https://gateway.pinata.cloud/ipfs/QmQ9WEgDweXcbZScXChcpDdT1PWYqFDvugTv7JRYHSQnAg',
  'https://gateway.pinata.cloud/ipfs/QmQ9WEgDweXcbZScXChcpDdT1PWYqFDvugTv7JRYHSQnAg',
  'https://gateway.pinata.cloud/ipfs/QmQ9WEgDweXcbZScXChcpDdT1PWYqFDvugTv7JRYHSQnAg',
  'https://gateway.pinata.cloud/ipfs/QmQ9WEgDweXcbZScXChcpDdT1PWYqFDvugTv7JRYHSQnAg',
].join(',')

async function main() {
  const privateKey = process.env.SEPOLIA_PRIVATE_KEY
  if (!privateKey) {
    console.log('Skip write test: set SEPOLIA_PRIVATE_KEY in .env.local to test createApartment')
    return
  }

  const { de_rentersContract } = JSON.parse(
    fs.readFileSync('./contracts/contractAddress.json', 'utf8')
  )

  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
  const wallet = new ethers.Wallet(privateKey, provider)
  const contract = new ethers.Contract(de_rentersContract, deRentersAbi.abi, wallet)

  const balance = await provider.getBalance(wallet.address)
  console.log('Signer:', wallet.address)
  console.log('Balance (ETH):', ethers.formatEther(balance))

  if (balance === 0) {
    console.log('Skip write test: signer has no Sepolia ETH')
    return
  }

  const before = await contract.getApartments()
  console.log('Apartments before:', before.length)

  const tx = await contract.createAppartment(
    'Sepolia Test House',
    'Automated test listing from script',
    'Sepolia',
    TEST_IMAGES,
    2,
    ethers.parseEther('0.01')
  )

  console.log('Tx sent:', tx.hash)
  await tx.wait()
  console.log('Tx confirmed')

  const after = await contract.getApartments()
  console.log('Apartments after:', after.length)
  console.log('Latest:', after[after.length - 1].name)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
