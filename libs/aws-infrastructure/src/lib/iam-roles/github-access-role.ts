import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { GithubActionsIdentityProvider, GithubActionsRole } from 'aws-cdk-github-oidc';
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class GithubAccessRole extends cdk.Stack {
    constructor(scope: Construct, name: string, props: cdk.StackProps) {
        super(scope, name, props);

        const environment = this.node.tryGetContext('environment') as string;
        const application = this.node.tryGetContext('application') as string;
        const githubOwner = this.node.tryGetContext('githubOwner') as string;
        const githubRepo = this.node.tryGetContext('githubRepo') as string;

        Tags.of(scope).add('environment', environment);
        Tags.of(scope).add('application', application);
        Tags.of(scope).add('creator', 'Mike G');
        Tags.of(scope).add('automation', 'AWS CDK');

        const provider = new GithubActionsIdentityProvider(this, 'GithubProvider');

        const deployRole = new GithubActionsRole(this, 'GithubDeployRole', {
            provider: provider,
            owner: githubOwner,
            repo: githubRepo,
            roleName: 'GithubDeployRole',
            description: 'This role deploys stuff to AWS using github actions',
            maxSessionDuration: cdk.Duration.hours(2),
        });

        // You may also use various "add*" policy methods!
        // "AdministratorAccess" not really a good idea, should scope this down to services we are really using
        deployRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'));
    }
}
