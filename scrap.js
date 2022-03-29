const asciichart = require ('asciichart');
const ethers = require('ethers');
require("dotenv").config();

const address = process.argv[2];
const network = 'homestead'; // Ethereum Mainnet

console.log(`
     _      _ 
   _( )__ _( )__ 
 _|     _|     _|
(_   _ (_   _ (  SCRAP v 1.03
 |__( )_|__( )_|

SMART CONTRACT RAPID ANALYSIS PLATFORM

Analysing address: ${address}
`);


const getHistory = async () => {
  const txCounter = [];
  const txValues = [];
  const uniqueWallets = [];
  const provider = new ethers.providers.EtherscanProvider(network, process.env.ETHERSCAN_API_KEY);
  const currentBlock= await provider.getBlockNumber();
  for (let i = 23; i >= 0; i--) {
    console.log(`Pulling hourly history ${i+1}/24`);
    const toBlock = currentBlock - (i * 60 * 60 / 4); // 1 hr @ 15 sec blocks
    const fromBlock = currentBlock - ((i + 1) * 60 * 60 / 4); // 2 hr @ 15 sec blocks
    const history = await provider.getHistory(address,fromBlock,toBlock);
    let txCount = 0;
    let txValue = 0;
    let walletCount = 0;
    const seenWallets = [];
    history.forEach((tx) => {
      txCount += 1;
      txValue += Number(ethers.utils.formatEther(tx.value));
      if (!seenWallets.includes(tx.from)) {
        walletCount += 1;
        seenWallets.push(tx.from);
      }
    });
    txCounter.push(txCount);
    txValues.push(Math.round(txValue));
    uniqueWallets.push(walletCount);
  }
  console.log(`##############################\n# Hourly Transaction Counts\n`);
  console.log (asciichart.plot(txCounter,{ height: 20 }));
  console.log(`##############################\n# Hourly Transaction Value (ETH)\n`);
  console.log (asciichart.plot(txValues,{ height: 20 }));
  console.log(`##############################\n# Hourly Unique Wallet Addresses\n`);
  console.log (asciichart.plot(uniqueWallets,{ height: 20 }));
  console.log(`##############################`);
  console.log(`# 24hr Total TX Count: ${txCounter.reduce((a, b) => a + b)}`);
  console.log(`# 24hr Transaction Value: ${txValues.reduce((a, b) => a + b)} ETH`);
  console.log(`# 24hr uniqueWallets: ${uniqueWallets.reduce((a, b) => a + b)}`);
  console.log(`##############################`);
  
}

getHistory();
