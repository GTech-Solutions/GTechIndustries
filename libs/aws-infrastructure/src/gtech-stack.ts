#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StaticS3WebsiteStack } from './static-s3-website.ts/static-s3-website-stack';

const app = new cdk.App();
new StaticS3WebsiteStack(app, 'StaticS3WebsiteStack', {
  env: {
    account: process.env['AWS_ACCOUNT'],
    region: process.env['AWS_PRIMARY_REGION'],
  },
  domainName: app.node.tryGetContext('domainName'),
  environment: app.node.tryGetContext('environment'),
  application: app.node.tryGetContext('application'),
});
