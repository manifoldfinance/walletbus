#!/usr/bin/env bash
set -ex

echo "Installing..."
node --version
yarn --version

yarn install
yarn run build
echo "Starting Service..."
cd packages/dashboard
echo "Access dashboard at http://localhost:3000 "
echo "Access RPC at http://localhost:24012/rpc "
sleep 1
yarn run start

