#!/bin/sh

yarn run abi-gen --abiGlob 'src/wyvern-ethereum/build/contracts/@(WyvernToken|WyvernDAO|WyvernExchange|WyvernRegistry).json' --templates src/abi_templates --output src/abi_gen 
