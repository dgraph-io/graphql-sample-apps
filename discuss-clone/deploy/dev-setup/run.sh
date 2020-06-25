#!/bin/bash
set -e

# run this from the project root dir.  e.g.:
#
# ./deploy/dev-setup/run.sh u

up() {
    docker run --rm -p 8080:8080 -p 9080:9080 -p 8000:8000 dgraph/standalone:master > deploy/dgraph.log 2>&1 &
    echo "** Starting Dgraph"
    sleep 20s
    echo "** Adding Schema"
    curl -X POST localhost:8080/admin/schema --data-binary '@deploy/schema.graphql'
    echo
    echo "** Loading Seed Data"
    yarn run load-data
}

down() {
    echo "not implemented :-( do 'docker ps', find the dgraph container, kill it"
}

if [ $# -gt 0 ]; then
    if [ $1 == 'up' ]; then
        up
    elif [ $1 == 'down' ]; then
        down
    else
        echo "up (to start the dev environment, or down (to stop dev environment))"
    fi
else
    echo "up (to start the dev environment, or down (to stop dev environment))"
fi