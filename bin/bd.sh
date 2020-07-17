#!/bin/bash -e

if [ -z "$PROJECT" -o -z "$REACT_APP_GRAPHQL_ENDPOINT" ]; then
  echo "PROJECT=project REACT_APP_GRAPHQL_ENDPOINT=http://foo/graphql Usage $0"
  exit -1
fi

if [ "$PROJECT" == "noop" ]; then
  echo "Nothing to do"
  exit 0
fi

cd $PROJECT
npm install
NODE_ENV=production npm run build
