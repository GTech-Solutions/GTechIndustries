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

    it('creates the S3 bucket for hosting the site', () => {
        // Arrange
        const stack = new StaticS3Website(app, 'StaticS3WebsiteStack', {});

        // Act
        const template = Template.fromStack(stack, {});

        // Assert
        template.hasResourceProperties('AWS::S3::Bucket', { BucketName: 'test.com' });
    });
});
