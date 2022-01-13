#!/bin/sh

yarn run abi-gen --abis 'src/wyvern-ethereum/build/contracts/@(WyvernToken|WyvernDAO|WyvernExchange|WyvernProxyRegistry|WyvernAtomicizer).json' --templates src/abi_templates --output src/abi_gen