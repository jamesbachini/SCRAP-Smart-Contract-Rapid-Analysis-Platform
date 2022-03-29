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
  for (let i = 0; i < 7; i++) {
    console.log(`Pulling day ${i+1} history`);
    const toBlock = currentBlock - (i * 24 * 60 * 60 / 4); // 1 day @ 15 sec blocks
    const fromBlock = currentBlock - ((i + 1) * 24 * 60 * 60 / 4); // 2 days @ 15 sec blocks
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
    txValues.push(txValue);
    uniqueWallets.push(walletCount);
  }
  console.log(`Daily Transaction Counts`);
  console.log (asciichart.plot(txCounter));
  console.log(`Daily Transaction Value (ETH)`);
  console.log (asciichart.plot(txValues));
  console.log(`Daily Unique Wallet Addresses`);
  console.log (asciichart.plot(uniqueWallets));
}

getHistory();
