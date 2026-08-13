#!/bin/bash

#simple shorthand run scripts

case "$1" in
    up)
        docker compose up -d
        ;;
    logs)
        docker logs -f palworld-server
        ;;
    down)
        docker compose down
        ;;
    *)
        echo "Invalid command; (e.g.) : ./r.sh up <- starts the containers"
        exit 1
        ;;
esac
