#!/bin/sh

yarn const_gen
yarn abi_gen
yarn lint
yarn run tsc
