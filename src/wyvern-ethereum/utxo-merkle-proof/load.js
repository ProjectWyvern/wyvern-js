const fs         = require('fs');
const MerkleTree = require('./index.js');

console.log('Loading Merkle tree...');
const start = Date.now() / 1000;
const merkleTree = MerkleTree.fromJSON(JSON.parse(fs.readFileSync('data/merkleTree.json')));
const end = Date.now() / 1000;
console.log('Loaded Merkle tree in ' + (end - start) + ' seconds!');

const root = merkleTree.getRoot();
console.log('Merkle root (hex): ' + root.toString('hex'));
