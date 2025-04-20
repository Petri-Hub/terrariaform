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

# Creates variables for the release URL and download directory
RELEASE_URL="https://github.com/tModLoader/tModLoader/releases/download/${TMOD_LOADER_VERSION}/tModLoader.zip"
DOWNLOAD_DIR="./server/"

# Clear previous build
rm -rf ./server

# Create download directory
mkdir -p "$DOWNLOAD_DIR"

# Downloading specified release of tModLoader
wget "$RELEASE_URL" -O "${DOWNLOAD_DIR}/tModLoader.zip"

# Checking if the download was successful
if [ $? -ne 0 ]; then
  echo "Error: Failed to download the release."
  exit 1
fi

# Extract the release
unzip "${DOWNLOAD_DIR}/tModLoader.zip" -d "./server"

# If extraction failed, exits with an error
if [ $? -ne 0 ]; then
  echo "Error: Failed to extract the release."
  exit 1
fi

# Remove the downloaded zip file
rm -f "${DOWNLOAD_DIR}/tModLoader.zip"

# Success.
echo "tModLoader release prepared successfully!"