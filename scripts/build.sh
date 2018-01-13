#!/bin/sh

yarn abi_gen

# works but some typechecking needs to be fixed
NODE_ENV=production yarn run webpack
