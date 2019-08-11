#!/bin/bash

set -eu

PROJECT_DIR=$(dirname "${BASH_SOURCE}")
cd $PROJECT_DIR

export PATH=$PATH:$PROJECT_DIR/../../node_modules/.bin

export NODE_ENV="development"
#export GNOMAD_API_URL=${GNOMAD_API_URL:-"https://gnomad.broadinstitute.org/api"}
#export GNOMAD_API_URL=${GNOMAD_API_URL:-"http://172.23.117.23:8007"}
export GNOMAD_API_URL=${GNOMAD_API_URL:-"http://35.188.202.99:8007"}

WEBPACK_DEV_SERVER_ARGS=""
#if [ "$LOGNAME" = "vagrant" ]; then
  WEBPACK_DEV_SERVER_ARGS="--host=0.0.0.0 --watch-poll"
#fi

webpack-dev-server --config=./config/webpack.config.client.js --hot $WEBPACK_DEV_SERVER_ARGS
