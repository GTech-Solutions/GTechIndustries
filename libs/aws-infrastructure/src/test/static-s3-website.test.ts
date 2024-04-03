import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { GithubAccessRole, StaticS3Website } from '@gtech/aws-infrastructure';
import { Template } from 'aws-cdk-lib/assertions';

let app: Construct;

describe('StaticS3WebsiteStack', () => {
    beforeEach(() => {
        app = new cdk.App({
            context: {
                environment: 'test',
                application: 'test',
                domainName: 'test.com',
                hostedZoneId: 'test',
                builtSourcePath: 'src',
            },
        });
    });

    it('creates the certificate for the specified domain name', () => {
        // Arrange
        const stack = new StaticS3Website(app, 'StaticS3WebsiteStack', {});

        // Act
        const template = Template.fromStack(stack, {});

        // Assert
        template.hasResourceProperties('AWS::CloudFormation::CustomResource', { DomainName: 'test.com', Region: 'us-east-1', HostedZoneId: 'test' });
    });

    it('creates the cloudfront origin access identity', () => {
        // Arrange
        const stack = new StaticS3Website(app, 'StaticS3WebsiteStack', {});

        // Act
        const template = Template.fromStack(stack, {});

        // Assert
        template.hasResourceProperties('AWS::CloudFront::CloudFrontOriginAccessIdentity', {
            CloudFrontOriginAccessIdentityConfig: { Comment: 'OAI for StaticS3WebsiteStack' },
        });
    });

    it('creates the S3 bucket for hosting the site', () => {
        // Arrange
        const stack = new StaticS3Website(app, 'StaticS3WebsiteStack', {});

        // Act
        const template = Template.fromStack(stack, {});

        // Assert
        template.hasResourceProperties('AWS::S3::Bucket', { BucketName: 'test.com' });
    });

    it('modifies the resource policy for the hosting bucket', () => {
        // Arrange
        const stack = new StaticS3Website(app, 'StaticS3WebsiteStack', {});

        // Act
        const template = Template.fromStack(stack, {});

        // Assert
        template.hasResourceProperties('AWS::S3::BucketPolicy', {
            Bucket: { Ref: 'testS3SiteBucket85923E96' },
        });
    });

    it('creates the cloudfront distribution', () => {
        // Arrange
        const stack = new StaticS3Website(app, 'StaticS3WebsiteStack', {});

        // Act
        const template = Template.fromStack(stack, {});

        // Assert
        template.hasResource('AWS::CloudFront::Distribution', {});
    });

    it('adds an A record to route 53', () => {
        // Arrange
        const stack = new StaticS3Website(app, 'StaticS3WebsiteStack', {});

        // Act
        const template = Template.fromStack(stack, {});

        // Assert
        template.hasResourceProperties('AWS::Route53::RecordSet', {
            HostedZoneId: 'test',
            Name: 'test.com.',
            Type: 'A',
        });
    });

    it('creates an s3 bucket deploy with invalidation', () => {
        // Arrange
        const stack = new StaticS3Website(app, 'StaticS3WebsiteStack', {});

        // Act
        const template = Template.fromStack(stack, {});

        // Assert
        template.hasResource('Custom::CDKBucketDeployment', {});
    });
});
