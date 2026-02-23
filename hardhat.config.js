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
      accounts: [
        '0x5c619cb572c35d910822c37cf3171b629b47e4ddd1a3563c02913903a9424df5',
        '0x3bb7a9e18dcecf6082c29c549566bb8a25cb12cbb56b13c9898cdb90fe886046',
        '0xb002af2a456ffb6d97d11e17632a5a1e5d11233af8c3694a08719c4308a10c06',
      ],
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
