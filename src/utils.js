const fs = require('fs').promises;

// Reads and returns json file at provided location relative to project data directory
async function readJson(path) {
    if (!path) {
        throw new Error('Missing path');
    }
    return JSON.parse(await fs.readFile(path));
}

async function writeJson(path, json) {
    if (!path || !json) {
        throw new Error('Missing path or json');
    }
    await fs.writeFile(path, JSON.stringify(json, null, 4));
}

module.exports = {
    readJson,
    writeJson
};