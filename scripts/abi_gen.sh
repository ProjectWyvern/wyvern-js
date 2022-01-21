#!/bin/sh

yarn run abi-gen --abis 'src/wyvern-ethereum/build/contracts/@(WyvernToken|WyvernDAO|WyvernExchange|WyvernProxyRegistry|WyvernAtomicizer).json' --output src/abi_gen