require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    polygon: {
      url: `${process.env.ALCHEMY_POLYGON_URL}`,
      accounts: [`0x${process.env.POLYGON_PRIVATE_KEY}`],
    } 
  },
  paths: {
    artifacts: './artifacts',
  }
};