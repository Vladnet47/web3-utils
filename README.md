# web3-utils

## How to scan transactions for your wallets

1) Clone repo and install dependencies

```bash
git clone https://github.com/Vladnet47/web3-utils.git
cd web3-utils
npm install --production
```

2) Create file called **configs.json** in root project directory and add etherscan key and your wallet addresses. Etherscan key can be created using free plan at https://etherscan.io/apis.

```js
// Example configs.json
{
    "etherscanKey": "91XS663WVIIBMTQCNGNA98QKP7MHZ12U07",
    "wallets": [
        "0x743Fc8Ba2a5e435B376bD2a7Ee5c95B470C85C22",
        "0x1D52798dCAd378582Ce1f5fC6607f1Bb070dCe42"
    ]
}
```

3) Run script from root directory.

```bash
node src/scan-tx.js
```

4) If script does not throw any errors, output json can be found in **out/** directory.