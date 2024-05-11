#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StaticS3Website } from './static-s3-website/static-s3-website';
import { GithubAccessRole } from './iam-roles/github-access-role';
import { DynamoTables } from './dynamo-tables/dynamo-tables';
import { AppRunner } from './app-runner/app-runner';

//Found help separating the stacks in the following link: https://github.com/aws/aws-cdk/issues/11625
const app = new cdk.App();
const bundlingStacks = app.node.tryGetContext('aws:cdk:bundling-stacks') as Array<string>;

if (bundlingStacks.includes('GithubAccessRoleStack')) {
    new GithubAccessRole(app, 'GithubAccessRoleStack', {
        env: {
            account: process.env['AWS_ACCOUNT'],
            region: process.env['AWS_PRIMARY_REGION'],
        },
    });
}

if (bundlingStacks.includes('StaticS3WebsiteStack')) {
    new StaticS3Website(app, 'StaticS3WebsiteStack', {
        env: {
            account: process.env['AWS_ACCOUNT'],
            region: process.env['AWS_PRIMARY_REGION'],
        },
    });
}

if (bundlingStacks.includes('DynamoTablesStack')) {
    new DynamoTables(app, 'DynamoTablesStack', {
        env: {
            account: process.env['AWS_ACCOUNT'],
            region: process.env['AWS_PRIMARY_REGION'],
        },
    });
}

if (bundlingStacks.includes('GtechDirectApiStack')) {
    new AppRunner(
        app,
        'GtechDirectApiStack',
        'gtechdirect',
        'Dockerfile',
        '../../../../apps/gtech-direct-api',
        {
            port: '8080',
            runtimeEnvironmentVariables: [],
        },
        {
            ingressConfiguration: { isPubliclyAccessible: true },
        },
        {
            env: {
                account: process.env['AWS_ACCOUNT'],
                region: process.env['AWS_PRIMARY_REGION'],
            },
        }
    );
}
