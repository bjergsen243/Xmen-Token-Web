const Web3 = require("web3");
const Tx = require("ethereumjs-tx");
const rpcURL = "https://goerli.infura.io/v3/8b38be151db64bac988b2e35faf230ce";
const web3 = new Web3(rpcURL);
const abi = require("./../abi/contracts/XmenToken.sol/XmenToken.json");
let tokenAddress = "0xd0d1C4c7Ddf89900fd3F99925a440d484927C3e3";
let privateKey = Buffer.from(
  "ebd0dcb9164aafc9ade34a8a098c4b8614f8545a9e6d0334c5c34c47783ee9c0",
  "hex"
);
let fromAddress = "0xC333bB038A89289B08683dfD428f9707B6F65da2";
let toAddress = "0x3A96CB910189840727Dcb0b9EE303391EA934504";

// Get ERC20 Token contract instance
let contract = new web3.eth.Contract(abi, tokenAddress);

// 1e18 === 1 HST
let amount = web3.utils.toHex(1e18);

web3.eth.getTransactionCount(fromAddress).then((count) => {
  let rawTransaction = {
    from: fromAddress,
    gasPrice: web3.utils.toHex(20 * 1e9),
    gasLimit: web3.utils.toHex(350000),
    to: tokenAddress,
    value: 0x0,
    data: contract.methods.mint(amount).encodeABI(),
    nonce: web3.utils.toHex(count),
  };

  let transaction = new Tx(rawTransaction);
  transaction.sign(privateKey);
  web3.eth
    .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
    .on("transactionHash", console.log);
});
