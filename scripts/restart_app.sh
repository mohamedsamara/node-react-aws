#!/bin/bash

# Log file to capture output (using the same file for both pm2 and deployment logs)
LOG_FILE="/home/ec2-user/app/deployment.log"

# Delete the log file if it exists, to start with a fresh log
if [ -f $LOG_FILE ]; then
    echo "Log file exists. Deleting the old log file..." >> $LOG_FILE
    rm $LOG_FILE
fi

# Make sure the log file exists, or create it
touch $LOG_FILE

# Set correct permissions for the log file (to ensure the ec2-user can write to it)
echo "Setting permissions for the log file..." >> $LOG_FILE
sudo chown ec2-user:ec2-user $LOG_FILE
sudo chmod 644 $LOG_FILE

echo "Restarting backend application..." >> $LOG_FILE

# Source the environment variables
echo "Sourcing environment variables..." >> $LOG_FILE
source /home/ec2-user/app/scripts/set_env_vars.sh
echo "Environment variables sourced." >> $LOG_FILE

# Log environment variables (for debugging)
echo "DB_HOST=$DB_HOST" >> $LOG_FILE
echo "DB_PORT=$DB_PORT" >> $LOG_FILE
echo "DB_USERNAME=$DB_USERNAME" >> $LOG_FILE
echo "DB_PASSWORD=$DB_PASSWORD" >> $LOG_FILE
echo "DB_NAME=$DB_NAME" >> $LOG_FILE
echo "NODE_ENV=$NODE_ENV" >> $LOG_FILE

# Check PM2 list output to debug
echo "Checking if PM2 list shows backend app..." >> $LOG_FILE
pm2 list >> $LOG_FILE

# Kill any existing PM2 processes (this is a clean-up step)
echo "Killing existing PM2 processes..." >> $LOG_FILE
pm2 kill >> $LOG_FILE

# Check if the backend application is already running with PM2
echo "Checking if backend is running with PM2..." >> $LOG_FILE
if pm2 status backend | grep -q "online"; then
  echo "Backend is running. Restarting..." >> $LOG_FILE
  pm2 restart backend --log $LOG_FILE
else
  echo "Backend not running. Starting..." >> $LOG_FILE
  pm2 start /home/ec2-user/app/index.js --name "backend" --env NODE_ENV=$NODE_ENV --env DB_HOST=$DB_HOST --env DB_PORT=$DB_PORT --env DB_USERNAME=$DB_USERNAME --env DB_PASSWORD=$DB_PASSWORD --env DB_NAME=$DB_NAME --log $LOG_FILE
fi

# Save PM2 processes to ensure they are restored on reboot
pm2 save >> $LOG_FILE

echo "Backend application has been restarted or started successfully!" >> $LOG_FILE
