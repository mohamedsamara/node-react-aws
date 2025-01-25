# Node React AWS

This project consists of a React frontend, a Node.js backend, and infrastructure code for deploying the app to AWS using CloudFormation, CodePipeline, and various AWS services such as EC2, RDS, S3, CloudFront, and CodeDeploy.

## Project Overview

- Frontend (React): A React app that serves as the user interface. It is deployed on CloudFront for CDN distribution.
- Backend (Node.js): A Node.js application that serves as the backend API. It runs on an EC2 instance.
- Infrastructure: The infrastructure is defined using CloudFormation templates and organized into separate stacks for modularity.
- CI/CD Pipeline: The project uses AWS CodePipeline, CodeBuild, and CodeDeploy to automate the deployment process utilizing `buildspec.yml`, `buildspec-frontend.yml`, and `appspec.yml`.

## CloudFormation Features

- IAM Roles Stack: Defines IAM roles for AWS services, including CodeBuild, CodeDeploy, CodePipeline, and EC2.
- S3 Buckets Stack: Contains S3 buckets for CodePipeline (backend and frontend) artifacts and frontend build (dist) artifacts.
- Network Stack: Configures VPC, subnets, security groups, and other networking resources.
- EC2 Instance Stack: Deploys an EC2 instance to run the backend Node.js application with the `codedeploy-agent`.
- RDS Instance Stack: Creates an RDS instance for your database (PostgreSQL).
- SSM Stack: The `ssm.yml` template uses SSM Parameter Store to securely store database connection details, such as DB_HOST, DB_NAME, and DB_PORT.
- CloudFront Stack: Configures CloudFront for frontend distribution.
- CodePipeline Stack: Sets up CodePipeline for continuous deployment.

## How CodePipeline Deploys the App

- Backend Deployment: The backend code is pushed to an S3 bucket as an artifact, which is then deployed to the EC2 instance using CodeDeploy.
- Frontend Deployment: The frontend React app is pushed to S3 and distributed through CloudFront for fast content delivery.

## Key Pair for EC2 Access

In order to securely access your EC2 instance, you will need to provide your own EC2 Key Pair. You can either create a new key pair or use an existing one from the AWS Console.

- Update the Key Pair Name in CloudFormation

  In the [infrastructure/ec2-instance.yml](infrastructure/ec2-instance.yml) file, replace the KeyPairName parameter with the name of your key pair:

  ```yml
  KeyPairName: <Your-KeyPair-Name>
  ```

## Accessing the EC2 Instance

After the EC2 instance is launched, you can SSH into the instance using the .pem file and the public IP address of the instance.

```bash
ssh -i /path/to/your-key-pair.pem ec2-user@<EC2_INSTANCE_PUBLIC_IP>
```

## CloudFormation Instructions

1. Upload Infrastructure Code to S3

   Run the following command to upload your infrastructure templates to an S3 bucket:

   ```bash
    aws s3 cp ./infrastructure/ <your-bucket-name> --recursive
   ```

   Make sure that the S3 bucket [your-bucket-name] exists.

2. Deploy the CloudFormation Stack

   To deploy the CloudFormation stack, run the following command, replacing the placeholders with your specific values:

   ```bash
   aws cloudformation create-stack \
   --stack-name MyAppDemo \
   --template-body file://main.yml \
   --parameters \
   ParameterKey=GitHubConnectionArn,ParameterValue=<your-github-connection-arn> \
   ParameterKey=MyIpAddress,ParameterValue=<your-ip-address> \
   --capabilities CAPABILITY_IAM
   ```

## Setup Instructions

1. Start the Backend Server and Frontend

   To start the server and frontend together, use the following steps:

   1. Install dependencies: First, navigate to your project directory and install the required dependencies for both the client and server.

      ```bash
      yarn install
      ```

   2. Start both server and frontend: To start both the backend and frontend at the same time, run the dev script from your root project directory. This will run the server (Express API) and the frontend (React app) concurrently.

      ```bash
      yarn dev
      ```

2. Build the Application for Production

   To create a production build of the app (both frontend and backend), run:

   ```bash
   yarn build
   ```

   After building the app, you can start both the server and frontend in production mode using:

   ```bash
   yarn start
   ```

3. ENV

   Create `.env` file for both client and server. See examples:

   [Frontend ENV](client/.env.example)

   [Backend ENV](server/.env.example)
