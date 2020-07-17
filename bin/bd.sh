#!/bin/bash -e

if [ -z "$PROJECT" -o -z "$BUCKET" -o -z "$DIRECTORY" -o -z "$REACT_APP_GRAPHQL_ENDPOINT" ]; then
  echo PROJECT=project BUCKET=bucket DIRECTORY=dir REACT_APP_GRAPHQL_ENDPOINT=foo/graphql Usage $0
  exit -1
fi

cd $PROJECT
npm install
NODE_ENV=production npm run build
aws s3 sync build/ s3://$BUCKET/$DIRECTORY/
