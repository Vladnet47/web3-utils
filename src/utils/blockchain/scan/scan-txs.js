const { getEtherscanProv } = require('../common');

async function scanTxs(address, chainId) {
    if (!address) {
        throw new Error('Missing address');
    }

    const prov = await getEtherscanProv(chainId);
    let startBlock = 0;
    let retrievedAll = false;
    const result = [];

    while (!retrievedAll) {
        // Get next 10000 txs (throttle set by etherscan)
        let txs;
        try {
            txs = await prov.getHistory(address, startBlock);
            retrievedAll = txs.length !== 10000;
            startBlock = retrievedAll ? 0 : txs[txs.length - 1].blockNumber;
        }
        catch (err) {
            console.log('Failed to scan txs: ' + err.message);
            break;
        }

        // Pass every tx to callback. Ignore txs from most recent block if not all were retrieved, since they'll be picked up again by the next scan
        for (const tx of txs) {
            if (tx && (!startBlock || tx.blockNumber !== startBlock)) {
                result.push(tx);
            }
        }
    }

    return result;
}

module.exports = scanTxs;