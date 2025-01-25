#!/bin/bash

# Define the log file
LOG_FILE="/home/ec2-user/app/deployment.log"

# Ensure the log file exists, or create it
touch $LOG_FILE

# Set correct permissions for the log file (to ensure the ec2-user can write to it)
echo "Setting permissions for the log file..." >> $LOG_FILE
sudo chown ec2-user:ec2-user $LOG_FILE
sudo chmod 644 $LOG_FILE

# Log the start of the deployment process
echo "Deployment started at $(date)" >> $LOG_FILE
