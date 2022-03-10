#!/usr/bin/env bash

set -euo pipefail

echo $BASH_VERSION

export NODE_ENV=development
echo $NODE_ENV

# cd to the root of the repo
cd "$(git rev-parse --show-toplevel)"

cd test_harness
yarn install
yarn run build
echo "Connecting to Rinkeby - ChainID 4"
node dist/src/index.js
