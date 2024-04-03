import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { GithubAccessRole } from '../iam-roles/github-access-role';

describe('GithubAccessRoleStack', () => {
    it('creates an iam role', () => {
        const app = new cdk.App({
            context: {
                environment: 'test',
                application: 'test',
                githubOwner: 'test',
                githubRepo: 'test',
            },
        });
        // WHEN
        const stack = new GithubAccessRole(app, 'GithubAccessRoleStack', {});
        // THEN
        const template = Template.fromStack(stack, {});

        template.hasResource('AWS::IAM::Role', {});
    });
});
