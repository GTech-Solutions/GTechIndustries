import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { GithubAccessRole } from '../iam-roles/github-access-role';
import { Construct } from 'constructs';

let app: Construct;

describe('GithubAccessRoleStack', () => {
    beforeEach(() => {
        app = new cdk.App({
            context: {
                environment: 'test',
                application: 'test',
                githubOwner: 'test',
                githubRepo: 'test',
            },
        });
    });

    it('creates the GithubDeployRole', () => {
        // Arrange
        const stack = new GithubAccessRole(app, 'GithubAccessRoleStack', {});

        // Act
        const template = Template.fromStack(stack, {});

        // Assert
        template.hasResourceProperties('AWS::IAM::Role', { RoleName: 'GithubDeployRole' });
    });

    it('creates the identity provider', () => {
        // Arrange
        const stack = new GithubAccessRole(app, 'GithubAccessRoleStack', {});

        // Act
        const template = Template.fromStack(stack, {});

        //Assert
        template.hasResource('Custom::AWSCDKOpenIdConnectProvider', {});
    });
});
