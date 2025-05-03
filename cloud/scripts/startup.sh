#!/bin/sh

# Variables
INSTALLATION_DIRECTORY="/srv/terrariaform"

# Updating the system and installing packages
echo "Updating Debian system..."
apt-get update -y
apt-get upgrade -y

# Installing necessary packages
echo "Installing required packages..."
apt-get install -y \
    curl \
    docker.io \
    docker-compose \
    git

# Enable and start Docker service
echo "Setting up Docker..."
systemctl enable docker
systemctl start docker

# Creating server directory
echo "Creating server directory..."
mkdir -p $INSTALLATION_DIRECTORY

# Cloning Terrariaform repository
echo "Cloning Terrariaform repository..."
git clone https://github.com/Petri-Hub/terrariaform.git $INSTALLATION_DIRECTORY

# Creating .env variable (TODO: Pull from cloud)
echo "Creating .env variable..."
echo "
    TMOD_AUTODOWNLOAD=2824688266,2824688072
    TMOD_ENABLEDMODS=2824688266,2824688072
    TMOD_SHUTDOWN_MESSAGE=Morram
    TMOD_AUTOSAVE_INTERVAL=15
    TMOD_MOTD=Tralalero Tralala
    TMOD_PASS=
    TMOD_MAXPLAYERS=32
    TMOD_WORLDNAME=Baguncinha
    TMOD_WORLDSIZE=1
    TMOD_WORLDSEED=bombardinocrocodilo
    TMOD_DIFFICULTY=1
    TMOD_USECONFIGFILE=No
    UPDATE_NOTICE=false
" > $INSTALLATION_DIRECTORY/.env

# Starting the server
echo "Starting Terraria server..."
cd $INSTALLATION_DIRECTORY && docker-compose up
