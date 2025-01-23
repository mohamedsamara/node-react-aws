#!/bin/bash

echo "Deleting old yarn.lock and package.json files..."

sudo rm -f /home/ec2-user/app/yarn.lock
sudo rm -f /home/ec2-user/app/package.json

echo "Old files deleted."
