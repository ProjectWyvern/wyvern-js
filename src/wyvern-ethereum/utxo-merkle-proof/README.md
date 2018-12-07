![Project Wyvern Logo](https://media.githubusercontent.com/media/ProjectWyvern/wyvern-branding/master/logo/logo-square-red-transparent-200x200.png?raw=true "Project Wyvern Logo")

## UTXO Set Merkle Proof Creation

[![https://badges.frapsoft.com/os/mit/mit.svg?v=102](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://opensource.org/licenses/MIT)

### Synopsis

The [WYV token](https://token.projectwyvern.com) was originally ported from a Bitcoin-style blockchain to an ERC20 token through the use of a Merkle tree proof in the Ethereum token smart contract: a user wishing to redeem a UTXO must prove that the UTXO existed in the final UTXO set of the Wyvern chain, using a Merkle tree proof, and prove that they owned the address which could spend the UTXO, by signing a message with the address's private key.

This repository contains the code used to generate the Merkle tree for the UTXO set. This process only needed to be done once - you don't need to do this if you want to redeem a UTXO - but this code allows you to verify yourself that all the Wyvern UTXOs were indeed redeemable on the Ethereum blockchain, and the mechanism should work for any Bitcoin-based coin in case others want to reuse it in the future.

### Generating and Verifying the Merkle Tree

Data files for the final Wyvern original-chain UTXO set are included in this repository - if you'd like, you can replicate them using the [Bitcore branch of the Wyvern repository](https://github.com/ProjectWyvern/wyvern/tree/bitcore).

First install dependencies:

```bash
yarn
```

Then generate the Merkle tree:

```bash
node generate.js
```

Once you've done so, you can check the [WYV token contract]() and verify that the stored UTXO set Merkle root matches your calculated value.
