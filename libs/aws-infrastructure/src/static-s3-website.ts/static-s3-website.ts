import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ssm, Duration, Stack, Tags } from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import {HostedZone} from "aws-cdk-lib/aws-route53";


// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface StaticS3WebsiteProps extends cdk.StackProps{
  domainName: string;
  environment: string;
  application: string
}

export class StaticS3Website extends cdk.Stack {
  constructor(parent: Stack, name: string, props: StaticS3WebsiteProps) {
    super(parent, name);

    Tags.of(parent).add('environment', props.environment);
    Tags.of(parent).add('application', props.application);
    Tags.of(parent).add('creator', 'Mike G');
    Tags.of(parent).add('automation', 'AWS CDK');

    const zone = HostedZone.fromLookup(this, `${props.application}-Zone`, { domainName: props.domainName });

    // TLS certificate
    const certificate = new Certificate(this, 'SiteCertificate', {
      domainName: props.domainName,
      validation: CertificateValidation.fromDns(zone),
    });

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, `${props.application}-S3-Cloudfront-OAI`, {
      comment: `OAI for ${name}`,
    });

    // Content bucket
    const siteBucket = new s3.Bucket(this, `${props.application}-S3-Site-Bucket`, {
      bucketName: props.domainName,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    // Grant access to cloudfront
    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [siteBucket.arnForObjects('*')],
        principals: [new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
      })
    );

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, `${props.application}-UI-Site-Distribution`, {
      certificate: certificate,
      domainNames: [props.domainName],
      defaultRootObject: 'index.html',
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.seconds(0),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.seconds(0),
        },
      ],
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(siteBucket, {
          originAccessIdentity: cloudfrontOAI,
        }),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, `${props.application}-UI-Deploy-With-Invalidation`, {
      sources: [s3deploy.Source.asset('../../../../dist/apps/gtech-industries/')],
      destinationBucket: siteBucket,
      distribution,
      cacheControl: [s3deploy.CacheControl.noCache()],
      memoryLimit: 1024,
    });
  }
}
