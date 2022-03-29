     _      _ 
   _( )__ _( )__ 
 _|     _|     _|
(_   _ (_   _ (  SCRAP v 1.03
 |__( )_|__( )_|

# SMART CONTRACT RAPID ANALYSIS PLATFORM

## Installation

Sign up for a Etherscan API key and add it to a .env file as
ETHERSCAN_API_KEY=ABC123ABC123ABC123

Then install the dependencies and run scrap.js

```
npm install
node scrap.js 0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45
```

Script is currently set to analyse hourly trends on a 24 hour timescale but this can be changed to daily/weekly if more applicable using the block timings.

Network is currently set to Ethereum mainnet on line 6. This can be changed if required but alternate networks will need etherscan API support.

More information at https://jamesbachini.com/defi-growth-metrics/

For further information on Ethers.js check the documentation at: https://docs.ethers.io/
