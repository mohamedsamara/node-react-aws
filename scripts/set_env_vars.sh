#!/bin/bash

# Fetch environment variables from SSM Parameter Store
echo "Fetching environment variables from SSM..."

export DB_HOST=$(aws ssm get-parameter --name "/node-react-aws/DB_HOST" --query "Parameter.Value" --output text)
export DB_PORT=$(aws ssm get-parameter --name "/node-react-aws/DB_PORT" --query "Parameter.Value" --output text)
export DB_USERNAME=$(aws ssm get-parameter --name "/node-react-aws/DB_USERNAME" --query "Parameter.Value" --output text)
export DB_PASSWORD=$(aws ssm get-parameter --name "/node-react-aws/DB_PASSWORD" --query "Parameter.Value" --output text)
export DB_NAME=$(aws ssm get-parameter --name "/node-react-aws/DB_NAME" --query "Parameter.Value" --output text)

# Echo the values to confirm they are fetched correctly
echo "DB_HOST=$DB_HOST"
echo "DB_PORT=$DB_PORT"
echo "DB_USERNAME=$DB_USERNAME"
echo "DB_PASSWORD=$DB_PASSWORD"
echo "DB_NAME=$DB_NAME"

# Remove existing entries for these variables in .bash_profile to prevent duplicates
sed -i '/export DB_HOST=/d' /home/ec2-user/.bash_profile
sed -i '/export DB_PORT=/d' /home/ec2-user/.bash_profile
sed -i '/export DB_USERNAME=/d' /home/ec2-user/.bash_profile
sed -i '/export DB_PASSWORD=/d' /home/ec2-user/.bash_profile
sed -i '/export DB_NAME=/d' /home/ec2-user/.bash_profile

# Define a function to set or replace the environment variable in .bash_profile
set_or_replace_var() {
  VAR_NAME=$1
  VAR_VALUE=$2
  # Check if the variable exists and replace or add
  if grep -q "^export $VAR_NAME=" /home/ec2-user/.bash_profile; then
    # If the variable exists, replace the line
    sed -i "s|^export $VAR_NAME=.*|export $VAR_NAME=$VAR_VALUE|" /home/ec2-user/.bash_profile
  else
    # If the variable doesn't exist, append it to the .bash_profile
    echo "export $VAR_NAME=$VAR_VALUE" >> /home/ec2-user/.bash_profile
  fi
}

# Set or replace environment variables in .bash_profile
set_or_replace_var "DB_HOST" "$DB_HOST"
set_or_replace_var "DB_PORT" "$DB_PORT"
set_or_replace_var "DB_USERNAME" "$DB_USERNAME"
set_or_replace_var "DB_PASSWORD" "$DB_PASSWORD"
set_or_replace_var "DB_NAME" "$DB_NAME"

# Source the .bash_profile to make the environment variables available
source /home/ec2-user/.bash_profile

echo "Environment variables set successfully!"
