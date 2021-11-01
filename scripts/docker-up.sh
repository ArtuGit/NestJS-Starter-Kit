#!/bin/bash

# Run from the project root (bash scripts/docker-up.sh)

cp ./config/common.env ./.env
docker-compose up --build -V
