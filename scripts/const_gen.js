const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./src/wyvern-ethereum/config.json'))
fs.writeFileSync('./src/utils/deployed.ts', 'export const deployed = ' + JSON.stringify(config.deployed, null, 4).replace(/"/g, '\'') + ';')

var exchangeABI = JSON.parse(fs.readFileSync('./src/wyvern-ethereum/build/contracts/WyvernExchange.json')).abi
fs.writeFileSync('./src/utils/exchangeABI.ts', 'export const exchangeABI = ' + JSON.stringify(exchangeABI, null, 4).replace(/"/g, '\'') + ';\n// tslint:disable:max-file-line-count')

var proxyRegistryABI = JSON.parse(fs.readFileSync('./src/wyvern-ethereum/build/contracts/WyvernProxyRegistry.json')).abi
fs.writeFileSync('./src/utils/proxyRegistryABI.ts', 'export const proxyRegistryABI = ' + JSON.stringify(proxyRegistryABI, null, 4).replace(/"/g, '\'') + ';\n// tslint:disable:max-file-line-count')
