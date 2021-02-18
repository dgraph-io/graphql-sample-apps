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
    curl -X POST localhost:8080/admin/schema --data-binary '@deploy/schema-no-auth.graphql'
    echo
    echo "** Loading Seed Data"
    yarn run load-data
    echo "** Adding Auth"
    #addAuth()
}

# This isn't really perfect.  In a real pipeline, I'd probably be installing the schema with auth in
# the first instance.  Then, the thing setting up the environment would get a valid token (probably calling
# Auth0 and injecting some secrets from local env variables) and use that to set up the data.  For now,
# this will do as it's only setting up the local dev environment.  When I build out the testing and prod
# environments, I'll up the level of this a bit.
addAuth() {
    curl -X POST localhost:8080/admin/schema --data-binary '@deploy/schema.graphql'
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
        echo "up (to start the dev environment), or down (to stop dev environment)"
    fi
else
    echo "up (to start the dev environment), or down (to stop dev environment)"
fi