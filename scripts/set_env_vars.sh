#!/bin/bash

LOG_FILE="/home/ec2-user/app/deployment.log"

echo "Running fetch_and_set_env_vars.sh at $(date)" >> $LOG_FILE

# Fetch environment variables from SSM Parameter Store
echo "Fetching environment variables from SSM..."

SECRET_JSON=$(aws secretsmanager get-secret-value --secret-id "/node-react-aws/DB_CREDENTIALS" --query "SecretString" --output text)
export DB_USERNAME=$(echo $SECRET_JSON | jq -r '.username')
export DB_PASSWORD=$(echo "$SECRET_JSON" | jq -r '.password')

export DB_HOST=$(aws ssm get-parameter --name "/node-react-aws/DB_HOST" --query "Parameter.Value" --output text)
export DB_PORT=$(aws ssm get-parameter --name "/node-react-aws/DB_PORT" --query "Parameter.Value" --output text)
export DB_NAME=$(aws ssm get-parameter --name "/node-react-aws/DB_NAME" --query "Parameter.Value" --output text)

# Set NODE_ENV to production
export NODE_ENV=production

# Echo the values to confirm they are fetched correctly
echo "DB_HOST=$DB_HOST"
echo "DB_PORT=$DB_PORT"
echo "DB_USERNAME=$DB_USERNAME"
echo "DB_PASSWORD=$DB_PASSWORD"
echo "DB_NAME=$DB_NAME" >> $LOG_FILE
echo "NODE_ENV=$NODE_ENV" >> $LOG_FILE

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
  ESCAPED_VALUE="$VAR_VALUE"

  # Check if the variable exists and replace or add
  if grep -q "^export $VAR_NAME=" /home/ec2-user/.bash_profile; then
    # If the variable exists, replace the line
    sed -i "s|^export $VAR_NAME=.*|export $VAR_NAME=\"$ESCAPED_VALUE\"|" /home/ec2-user/.bash_profile
    echo "Updated $VAR_NAME in .bash_profile" >> $LOG_FILE
  else
    # If the variable doesn't exist, append it to the .bash_profile
    echo "export $VAR_NAME=\"$ESCAPED_VALUE\"" >> /home/ec2-user/.bash_profile
    echo "Added $VAR_NAME to .bash_profile" >> $LOG_FILE
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

if [ $? -eq 0 ]; then
    echo ".bash_profile sourced successfully." >> $LOG_FILE
else
    echo "Error sourcing .bash_profile." >> $LOG_FILE
    exit 1
fi

echo "Environment variables set successfully!" >> $LOG_FILE
