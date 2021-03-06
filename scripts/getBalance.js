const Web3 = require('web3')
const rpcURL = 'https://goerli.infura.io/v3/8b38be151db64bac988b2e35faf230ce'
const web3 = new Web3(rpcURL)
let tokenAddress = "YOUR_TOKEN_ADDRESS";
let walletAddress = "YOUR_ADDRESS";

// The minimum ABI to get ERC20 Token balance
let minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

// Get ERC20 Token contract instance
let contract = new web3.eth.Contract(minABI,tokenAddress);

// Call balanceOf function


async function getBalance() {
    balance = await contract.methods.balanceOf(walletAddress).call();
    return balance;
  }
  
  getBalance().then(function (result) {
    console.log(result);
});
// them 18 so 0
