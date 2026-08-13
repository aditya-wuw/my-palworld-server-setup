#!/bin/bash

#simple shorthand run scripts

case "$1" in
    d-up)
        docker compose up -d
        ;;
    server-logs)
        docker logs -f palworld-server
        ;;
    d-down)
        docker compose down
        ;;
    *)
        echo "Invalid command; (e.g.) : " ./r.sh d-up "  <- starts the containers"
        exit 1
        ;;
esac
