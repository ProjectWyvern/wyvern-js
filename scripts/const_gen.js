const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./src/wyvern-ethereum/config.json'))
fs.writeFileSync('./src/utils/deployed.ts', 'export const deployed = ' + JSON.stringify(config.deployed, null, 4).replace(/"/g, '\'') + ';')
