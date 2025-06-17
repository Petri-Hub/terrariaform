#!/bin/sh

# Variables
INSTALLATION_DIRECTORY="/srv/terrariaform"
EBS_DEVICE="/dev/xvdb"
MOUNT_POINT="/mnt/terrariaform-data"

# Disabling interactive prompts
echo "Setting Debian as non-interactive..."
export DEBIAN_FRONTEND=noninteractive

# Updating the system and installing packages
echo "Updating Debian system..."
apt-get update -y
apt-get upgrade -y

# Waiting for EBS device to be attached...
while [ ! -b "$EBS_DEVICE" ]; do
  echo "Waiting for EBS device $EBS_DEVICE to be attached..."
  sleep 1
done

# Check if the EBS volume is already formatted
echo "Checking if EBS volume is formatted..."
if ! blkid $EBS_DEVICE; then
  echo "EBS volume is not formatted. Formatting now..."
  mkfs.ext4 $EBS_DEVICE
else
  echo "EBS volume is already formatted. Skipping format."
fi

# Mounting the volume
echo "Mounting EBS volume..."
mkdir -p $MOUNT_POINT
mount $EBS_DEVICE $MOUNT_POINT

# Ensuring the volume mounts on reboot
echo "Registering EBS mount on reboot..."
if ! grep -q "$EBS_DEVICE" /etc/fstab; then
  echo "$EBS_DEVICE $MOUNT_POINT ext4 defaults,nofail 0 2" >> /etc/fstab
fi

# Create server directory on EBS volume for Docker
echo "Creating directory on EBS for game server..."
mkdir -p $MOUNT_POINT/server

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

# Cloning Terrariaform repository
echo "Cloning Terrariaform repository..."
git clone https://github.com/Petri-Hub/terrariaform.git $INSTALLATION_DIRECTORY

# Creating .env variable from Terraform template
echo "Creating .env variable..."
echo '${env_config}' > $INSTALLATION_DIRECTORY/.env

# Starting the server
echo "Starting Terraria server..."
cd $INSTALLATION_DIRECTORY && docker-compose up
