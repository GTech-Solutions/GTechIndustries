#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StaticS3Website } from './static-s3-website.ts/static-s3-website';

class StaticS3WebsiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
    super(parent, name, props);

    new StaticS3Website(this, `${app.node.tryGetContext('application')}-UI-StaticSite`, {
      domainName: app.node.tryGetContext('domainName'),
      environment: app.node.tryGetContext('environment'),
      application: app.node.tryGetContext('application'),
      hostedZoneId: app.node.tryGetContext('hostedZoneId'),
      builtSourcePath: app.node.tryGetContext('builtSourcePath'),
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
