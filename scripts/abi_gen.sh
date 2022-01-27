#!/bin/sh

yarn run abi-gen --abiGlob 'src/wyvern-ethereum/build/contracts/@(AuthenticatedProxy|WyvernToken|WyvernDAO|WyvernExchange|WyvernProxyRegistry|WyvernAtomicizer).json' --templates src/abi_templates --output src/abi_gen
