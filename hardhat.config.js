require('@nomicfoundation/hardhat-toolbox')
module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    
sepolia: {
  url: 'https://sepolia.infura.io/v3/f0900a728beb4160b53743521ffeac71',
  accounts: ['0x5c619cb572c35d910822c37cf3171b629b47e4ddd1a3563c02913903a9424df5'],
  chainId: 11155111,
},
  },
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 40000,
  },
}
