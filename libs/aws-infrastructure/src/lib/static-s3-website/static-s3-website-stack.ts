import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface StaticS3WebsiteProps extends cdk.StackProps{
  domainName: string;
  environment: string;
}

export class StaticS3WebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: StaticS3WebsiteProps) {
    super(scope, id, props);

    
  }
}
