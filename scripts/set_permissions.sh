#!/bin/bash

LOG_FILE="/home/ec2-user/app/deployment.log"

# Log the start time of permissions setup
echo "Running set_permissions.sh at $(date)" >> $LOG_FILE

# Change ownership of all files to ec2-user:ec2-user
echo "Changing ownership of files..." >> $LOG_FILE
chown -R ec2-user:ec2-user /home/ec2-user/app

# Set directory permissions to 755 (read/write/execute for ec2-user, read/execute for group/others)
echo "Setting directory permissions to 755..." >> $LOG_FILE
find /home/ec2-user/app -type d -exec chmod 755 {} \;

# Set file permissions to 644 (read/write for ec2-user, read-only for group/others)
echo "Setting file permissions to 644..." >> $LOG_FILE
find /home/ec2-user/app -type f -exec chmod 644 {} \;

echo "Permissions set successfully at $(date)" >> $LOG_FILE
