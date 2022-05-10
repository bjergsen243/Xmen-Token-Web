const Web3 = require("web3");
const Tx = require("ethereumjs-tx");
const rpcURL = "https://goerli.infura.io/v3/YOUR_API_KEY";
const web3 = new Web3(rpcURL);
const abi = require("./../abi/contracts/XmenToken.sol/XmenToken.json");
let tokenAddress = "YOUR_TOKEN_ADDRESS";
let privateKey = Buffer.from(
  "YOUR_PRIVATE_KEY",
  "hex"
);
let fromAddress = "YOUR_ADDRESS";
let toAddress = "TO_ADDRESS";

// Get ERC20 Token contract instance
let contract = new web3.eth.Contract(abi, tokenAddress);

// 1e18 === 1 HST
let amount = web3.utils.toHex(1e18);

web3.eth.getTransactionCount(fromAddress).then((count) => {
  let rawTransaction = {
    from: fromAddress,
    gasPrice: web3.utils.toHex(30 * 1e9),
    gasLimit: web3.utils.toHex(450000),
    to: tokenAddress,
    value: 0x0,
    data: contract.methods.transfer(toAddress, amount).encodeABI(),
    nonce: web3.utils.toHex(count),
  };

  let transaction = new Tx(rawTransaction);
  transaction.sign(privateKey);
  web3.eth
    .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
    .on("transactionHash", console.log);
});
