#!/bin/bash

#simple shorthand run script

while true; do
    echo -e "make sure your docker desktop client is running and use the following commands\n\n1. up - spin up Palworld server container along with playit.gg and backupAPI\n2. restart - restart Palworld server\n3. logs - watch palworld server logs\n4. exit - exit the app\n"
    read -p "Input> " cmd arg1
    case "$cmd" in
        up)
            docker compose up -d --build
            ;;
        restart)
            echo -e "\nRestarting server...."
            docker restart palworld-server
            ;;
        logs)
            # Catch Ctrl+C (SIGINT) so it returns to the loop instead of exiting
            trap '' INT
            docker logs -f palworld-server
            trap - INT
            echo ""
            ;;
        down)
            docker compose down
            ;;
        clear)
            clear
            ;;
        exit|quit)
            echo "Exiting..."
            break
            ;;
        *)
            echo "Invalid command. Available: up, logs, down, exit"
            ;;
    esac
    echo ""
done
