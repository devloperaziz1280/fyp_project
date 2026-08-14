require('dotenv').config({ path: '.env.local' })
const { ethers } = require('ethers')
const fs = require('fs')
const deRentersAbi = require('../artifacts/contracts/de_renters.sol/fyp_contract.json')

async function main() {
  const { de_rentersContract } = JSON.parse(
    fs.readFileSync('./contracts/contractAddress.json', 'utf8')
  )

  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
  const contract = new ethers.Contract(de_rentersContract, deRentersAbi.abi, provider)

  const network = await provider.getNetwork()
  const apartments = await contract.getApartments()

  console.log('Network chainId:', network.chainId.toString())
  console.log('Contract:', de_rentersContract)
  console.log('Apartments on chain:', apartments.length)

  apartments.forEach((apt, i) => {
    console.log(`#${i + 1} id=${apt.id} name="${apt.name}"`)
  })
}

main().catch((error) => {
  console.error(error.message || error)
  process.exitCode = 1
})
