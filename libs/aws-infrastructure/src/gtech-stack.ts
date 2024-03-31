#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StaticS3Website } from './static-s3-website/static-s3-website';

class StaticS3WebsiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
    super(parent, name, props);

    new StaticS3Website(this, `${app.node.tryGetContext('application')}-UI-StaticSite`, {
      domainName: this.node.tryGetContext('domainName'),
      environment: this.node.tryGetContext('environment'),
      application: this.node.tryGetContext('application'),
      hostedZoneId: this.node.tryGetContext('hostedZoneId'),
      builtSourcePath: this.node.tryGetContext('builtSourcePath'),
    });
  }
}

const app = new cdk.App();

new StaticS3WebsiteStack(app, 'StaticS3WebsiteStack', {
  env: {
    account: process.env['AWS_ACCOUNT'],
    region: process.env['AWS_PRIMARY_REGION'],
  },
});

app.synth();
