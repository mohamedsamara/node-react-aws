#!/bin/bash

LOG_FILE="/home/ec2-user/app/deployment.log"
echo "Running fetch_and_set_env_vars.sh at $(date)" >> $LOG_FILE

# Fetch environment variables from Secrets Manager and SSM
echo "Fetching environment variables from SSM..." >> $LOG_FILE

SECRET_JSON=$(aws secretsmanager get-secret-value --secret-id "/node-react-aws/DB_CREDENTIALS" --query "SecretString" --output text)
export DB_USERNAME=$(echo $SECRET_JSON | jq -r '.username')
export DB_PASSWORD=$(echo "$SECRET_JSON" | jq -r '.password')

export DB_HOST=$(aws ssm get-parameter --name "/node-react-aws/DB_HOST" --query "Parameter.Value" --output text)
export DB_PORT=$(aws ssm get-parameter --name "/node-react-aws/DB_PORT" --query "Parameter.Value" --output text)
export DB_NAME=$(aws ssm get-parameter --name "/node-react-aws/DB_NAME" --query "Parameter.Value" --output text)

# Set NODE_ENV to production
export NODE_ENV=production
echo "NODE_ENV set to production." >> $LOG_FILE

# Clean up .bash_profile to remove old entries (if they exist)
echo "Cleaning up .bash_profile..." >> $LOG_FILE
for var_name in "DB_HOST" "DB_PORT" "DB_USERNAME" "DB_PASSWORD" "DB_NAME"; do
  sed -i "/export $var_name=/d" /home/ec2-user/.bash_profile
done

# Function to set or replace environment variables in .bash_profile
set_or_replace_var() {
  local var_name=$1
  local var_value=$2

  echo "Setting $var_name in .bash_profile" >> $LOG_FILE
  if grep -q "^export $var_name=" /home/ec2-user/.bash_profile; then
    # Replace existing variable
    sed -i "s|^export $var_name=.*|export $var_name=\"$var_value\"|" /home/ec2-user/.bash_profile
    echo "Updated $var_name in .bash_profile." >> $LOG_FILE
  else
    # Add new variable
    echo "export $var_name=\"$var_value\"" >> /home/ec2-user/.bash_profile
    echo "Added $var_name to .bash_profile." >> $LOG_FILE
  fi
}

# Add or update all environment variables to .bash_profile
for var_name in "DB_HOST" "DB_PORT" "DB_USERNAME" "DB_PASSWORD" "DB_NAME" "NODE_ENV"; do
  set_or_replace_var "$var_name" "${!var_name}"
done

# Source the .bash_profile to apply the changes
echo "Sourcing .bash_profile to apply changes..." >> $LOG_FILE
source /home/ec2-user/.bash_profile
if [ $? -eq 0 ]; then
  echo ".bash_profile sourced successfully." >> $LOG_FILE
else
  echo "Error sourcing .bash_profile." >> $LOG_FILE
  exit 1
fi

echo "Environment variables set successfully!" >> $LOG_FILE
