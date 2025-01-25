#!/bin/bash

# Change ownership of all files to ec2-user:ec2-user
sudo chown -R ec2-user:ec2-user /home/ec2-user/app

# Set directory permissions to 755 (read/write/execute for ec2-user, read/execute for group/others)
find /home/ec2-user/app -type d -exec chmod 755 {} \;

# Set file permissions to 644 (read/write for ec2-user, read-only for group/others)
find /home/ec2-user/app -type f -exec chmod 644 {} \;
