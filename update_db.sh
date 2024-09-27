#!/bin/bash

# Export the updated database from the container add sudo if linux
# docker compose exec db mariadb-dump -u wordpress -pwordpress local > ./{the sql file name}

sudo docker compose exec db mariadb-dump -u wordpress -pwordpress local > ./database.sql