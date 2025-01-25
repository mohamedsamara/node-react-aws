#!/bin/bash

LOG_FILE="/home/ec2-user/app/deployment.log"

echo "Running install_dependencies.sh at $(date)" >> $LOG_FILE

# Check if npm is installed, if not install it
if ! command -v npm &> /dev/null
then
    echo "npm not found, installing Node.js and npm..." >> $LOG_FILE
    sudo curl -sL https://rpm.nodesource.com/setup_20.x | sudo -E bash - >> $LOG_FILE 2>&1
    sudo yum install -y nodejs >> $LOG_FILE 2>&1
    echo "npm installed successfully." >> $LOG_FILE

else
    echo "npm is already installed" >> $LOG_FILE
fi

# Check if Yarn is installed, if not install it
if ! command -v yarn &> /dev/null
then
    echo "Yarn not found, installing..." >> $LOG_FILE
    sudo npm install -g yarn >> $LOG_FILE 2>&1
    echo "Yarn installed successfully." >> $LOG_FILE
else
    echo "Yarn is already installed" >> $LOG_FILE
fi

# Check if PM2 is installed, if not install it
if ! command -v pm2 &> /dev/null
then
    echo "PM2 not found, installing..." >> $LOG_FILE
    sudo npm install -g pm2 >> $LOG_FILE 2>&1
    echo "PM2 installed successfully." >> $LOG_FILE
else
    echo "PM2 is already installed" >> $LOG_FILE
fi

# Now install the dependencies using Yarn
echo "Installing backend dependencies..." >> $LOG_FILE
cd /home/ec2-user/app  # Ensure this path matches your directory structure
yarn install >> $LOG_FILE 2>&1
if [ $? -eq 0 ]; then
    echo "Backend dependencies installed successfully." >> $LOG_FILE
else
    echo "Error installing backend dependencies." >> $LOG_FILE
    exit 1
fi

echo "install_dependencies.sh completed successfully at $(date)" >> $LOG_FILE