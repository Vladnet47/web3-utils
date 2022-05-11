const ethers = require('ethers');
const LooksEnsurer = require('../../src/apps/looks-farmer/looks-insurer');
const { getAlchemyHttpProv, readConfigs, LooksrareRequests } = require('../../src/utils');

const TX_HASH = '0xed418bae55e196d4f28c11de92f2ed80e050c3f802206afd7a46d7997a4810d2';
process.env.PATH_TO_CONFIGS = '/home/vdog/workspace/private/web3-utils/configs.json';
const SAVE_PATH = process.cwd() + '/tests/apps/looks-policies.csv';

async function main() {
    const { privateKeys } = await readConfigs();
    const looksRequests = new LooksrareRequests(false);
    const le = new LooksEnsurer(looksRequests, privateKeys, SAVE_PATH, true);
    await le.load();
    //await le.addPolicy('vdog', '0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258', 81312, 0.1);

    const prov = await getAlchemyHttpProv();
    const tx = await prov.getTransaction(TX_HASH);
    await le.handleTx(tx);

    console.log(le.policies);
}

main().catch(console.log);