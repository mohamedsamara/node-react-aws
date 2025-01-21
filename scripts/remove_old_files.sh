#!/bin/bash

echo "Deleting old yarn.lock and package.json files..."

rm -f /home/ec2-user/app/yarn.lock
rm -f /home/ec2-user/app/package.json

echo "Old files deleted."
