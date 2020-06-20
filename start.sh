#! /bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color


clear

printf " ${GREEN} STARTING THE APPLICATIONS! ${NC} \n"


#START THE SERVER

#docker compose
docker-compose up -d
printf "${GREEN} Server running on port 8000${NC} \n"


