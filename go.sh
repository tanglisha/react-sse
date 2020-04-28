#!/usr/bin/env bash

pushd src
node fakeServer.js &
$! > "../fakeserver.pid"
popd

yarn install
yarn start

if [[ -f "fakeserver.pid" ]] ; then
  rm "fakeserver.pid"
fi
