const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider")
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: { // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }, kovan: {
      provider: function(){
        return new HDWalletProvider(
          //mnemoic goes here
          'https://kovan.infura.io/v3/c54d4df411c84c03aa0589f1801007f2'
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    }
  },
    contracts_directory: './contracts/',
    contracts_build_directory: './src/abis/',
    compilers: {
      solc: {
        version:  "0.8.10",
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
  ;
