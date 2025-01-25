#!/bin/bash

# Define the log file
LOG_FILE="/home/ec2-user/app/deployment.log"

# Log the start of the script
echo "Running delete_old_files.sh at $(date)" >> $LOG_FILE

# Deleting old yarn.lock and package.json files
echo "Deleting old yarn.lock and package.json files..." >> $LOG_FILE
if sudo rm -f /home/ec2-user/app/yarn.lock; then
    echo "yarn.lock deleted successfully." >> $LOG_FILE
else
    echo "Failed to delete yarn.lock." >> $LOG_FILE
fi

# Final log entry
echo "Old files deleted." >> $LOG_FILE
echo "delete_old_files.sh completed at $(date)" >> $LOG_FILE
