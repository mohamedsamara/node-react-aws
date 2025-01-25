#!/bin/bash

# Log file to capture output (using the same file for both pm2 and deployment logs)
LOG_FILE="/home/ec2-user/app/deployment.log"

echo "Running restart_app.sh at $(date)" >> $LOG_FILE

echo "Restarting backend application..." >> $LOG_FILE

# Source the environment variables
echo "Sourcing environment variables..." >> $LOG_FILE
if source /home/ec2-user/app/scripts/set_env_vars.sh; then
    echo "Environment variables sourced successfully." >> $LOG_FILE
else
    echo "Failed to source environment variables." >> $LOG_FILE
    exit 1  # Exit if environment variables are not sourced
fi

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

echo "Backend application has been restarted or started successfully at $(date)" >> $LOG_FILE
