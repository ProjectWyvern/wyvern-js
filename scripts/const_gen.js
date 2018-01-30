const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./src/wyvern-ethereum/config.json'))
fs.writeFileSync('./src/utils/deployed.ts', 'export const deployed = ' + JSON.stringify(config.deployed, null, 4).replace(/"/g, '\'') + ';')

var exchangeABI = JSON.parse(fs.readFileSync('./src/wyvern-ethereum/build/contracts/WyvernExchange.json')).abi
fs.writeFileSync('./src/utils/exchangeABI.ts', 'export const exchangeABI = ' + JSON.stringify(exchangeABI, null, 4).replace(/"/g, '\'') + ';\n// tslint:disable:max-file-line-count')

var proxyRegistryABI = JSON.parse(fs.readFileSync('./src/wyvern-ethereum/build/contracts/WyvernProxyRegistry.json')).abi
fs.writeFileSync('./src/utils/proxyRegistryABI.ts', 'export const proxyRegistryABI = ' + JSON.stringify(proxyRegistryABI, null, 4).replace(/"/g, '\'') + ';\n// tslint:disable:max-file-line-count')

var daoABI = JSON.parse(fs.readFileSync('./src/wyvern-ethereum/build/contracts/WyvernDAO.json')).abi
fs.writeFileSync('./src/utils/daoABI.ts', 'export const daoABI = ' + JSON.stringify(daoABI, null, 4).replace(/"/g, '\'') + ';\n// tslint:disable:max-file-line-count')

var tokenABI = JSON.parse(fs.readFileSync('./src/wyvern-ethereum/build/contracts/WyvernToken.json')).abi
fs.writeFileSync('./src/utils/tokenABI.ts', 'export const tokenABI = ' + JSON.stringify(tokenABI, null, 4).replace(/"/g, '\'') + ';\n// tslint:disable:max-file-line-count')

var lazyBankABI = JSON.parse(fs.readFileSync('./src/wyvern-ethereum/build/contracts/WyvernLazyBank.json')).abi
fs.writeFileSync('./src/utils/lazyBankABI.ts', 'export const lazyBankABI = ' + JSON.stringify(lazyBankABI, null, 4).replace(/"/g, '\'') + ';\n// tslint:disable:max-file-line-count')
