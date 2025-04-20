#!/bin/bash

# Load environment variables, exits on failure.
if [ -f .env ]; then
  source .env
else
  echo "Error: .env file not found!"
  exit 1
fi

# Validates .env file variables needed in the install script
if [ -z "$TMOD_LOADER_VERSION" ]; then
  echo "Error: TMODLOADER_VERSION is not set in .env!"
  exit 1
fi

# Verify if the server folder exists
if [ ! -d "./server" ]; then
    echo "Error: ./server folder does not exist."
    exit 1
fi

# Verify if the Dockerfile is present
if [ ! -f "./server/DedicatedServerUtils/Dockerfile" ]; then
    echo "Error: ./server/DedicatedServerUtils/Dockerfile file does not exist."
    exit 1
fi

# Build the Docker image
docker build \
    --build-arg TML_VERSION="$TMOD_LOADER_VERSION" \
    --build-arg UID="1000" \
    --build-arg GID="1000" \
    -t "tmodloader-server:latest" \
    -f ./server/DedicatedServerUtils/Dockerfile ./server