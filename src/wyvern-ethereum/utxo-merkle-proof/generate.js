const MerkleTree = require('./index.js');
const fs = require('fs');
const bs58check = require('bs58check');

const utxos = JSON.parse(fs.readFileSync('data/utxos.json'));

console.log('Total ' + utxos.length + ' UTXOs');

var total = 0;
utxos.map(utxo => {
  total += utxo.satoshis;
});

console.log('Total value: ' + total / 1e8);

var arr = [];

utxos.map(utxo => {
  const rawAddr = bs58check.decode(utxo.address).slice(1, 21).toString('hex');
  arr.push([
    {type: 'bytes32', value: utxo.txid},
    {type: 'bytes20', value: rawAddr},
    {type: 'uint8', value: utxo.outputIndex},
    {type: 'uint', value: utxo.satoshis}
  ]);
});

console.log('Generating Merkle tree...');
const start = Date.now() / 1000;
const merkleTree = new MerkleTree(arr);
const end = Date.now() / 1000;
console.log('Generated Merkle tree in ' + (end - start) + ' seconds!');

const root = merkleTree.getHexRoot();
console.log('Merkle root (hex): ' + root);

const json = merkleTree.toJSON();
const path = 'data/merkleTree.json';
fs.writeFileSync(path, json);
console.log('Wrote Merkle tree to ' + path);
