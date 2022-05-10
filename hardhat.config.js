require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require('web3');
require('hardhat-abi-exporter');
module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: `${process.env.ALCHEMY_GOERLI_URL}`,
      accounts: [`0x${process.env.GOERLI_PRIVATE_KEY}`],
    } 
  },
  paths: {
    artifacts: './artifacts',
  }
};