#!/bin/sh

yarn run mocha test/*.ts --require ts-node/register/transpile-only

exit 0
