#!/usr/bin/env bash

set -euo pipefail
shopt -s globstar

echo $BASH_VERSION

export NODE_ENV=development
echo $NODE_ENV

# cd to the root of the repo
cd "$(git rev-parse --show-toplevel)"
sleep 1
if [ ! -d node_modules ]; then
  yarn install
  yarn run build
  else
  echo "root node_modules already exists, skipping yarn install and build"
fi

dashboard() {
  echo "Building Interface..."
  echo "Starting service..."
  cd packages/dashboard
  yarn run start
}

dashboard
sleep 1

