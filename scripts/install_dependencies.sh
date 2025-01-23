#!/bin/bash

# Check if npm is installed, if not install it
if ! command -v npm &> /dev/null
then
    echo "npm not found, installing Node.js and npm..."
    sudo curl -sL https://rpm.nodesource.com/setup_20.x | sudo -E bash -
    sudo yum install -y nodejs
else
    echo "npm is already installed"
fi

# Check if Yarn is installed, if not install it
if ! command -v yarn &> /dev/null
then
    echo "Yarn not found, installing..."
    sudo npm install -g yarn
else
    echo "Yarn is already installed"
fi

# Check if PM2 is installed, if not install it
if ! command -v pm2 &> /dev/null
then
    echo "PM2 not found, installing..."
    sudo npm install -g pm2
else
    echo "PM2 is already installed"
fi

# Set correct permissions for the app (to ensure the ec2-user can write to it)
sudo chown -R ec2-user:ec2-user /home/ec2-user/app

# Now install the dependencies using Yarn
echo "Installing backend dependencies..."
cd /home/ec2-user/app  # Ensure this path matches your directory structure
yarn install
