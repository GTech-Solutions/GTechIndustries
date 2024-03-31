import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ssm, Duration, Stack, Tags } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  Certificate,
  CertificateValidation,
  DnsValidatedCertificate,
} from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';

export interface StaticS3WebsiteProps extends cdk.StackProps {
  domainName: string;
  hostedZoneId: string;
  environment: string;
  application: string;
  builtSourcePath: string;
}

export class StaticS3Website extends Construct {
  constructor(parent: Stack, name: string, props: StaticS3WebsiteProps) {
    super(parent, name);

    Tags.of(parent).add('environment', props.environment);
    Tags.of(parent).add('application', props.application);
    Tags.of(parent).add('creator', 'Mike G');
    Tags.of(parent).add('automation', 'AWS CDK');

    const zone = HostedZone.fromHostedZoneAttributes(
      this,
      `${props.application}-Zone`,
      { hostedZoneId: props.hostedZoneId, zoneName: props.domainName }
    );

    // TLS certificate should probbly write another stack and move away from DnsValidatedCertificate
    const certificate = new DnsValidatedCertificate(this, 'mySiteCert', {
      domainName: props.domainName,
      hostedZone: zone,
      region: 'us-east-1',
    });

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      `${props.application}-S3-Cloudfront-OAI`,
      {
        comment: `OAI for ${name}`,
      }
    );

    // Content bucket
    const siteBucket = new s3.Bucket(
      this,
      `${props.application}-S3-Site-Bucket`,
      {
        bucketName: props.domainName,
        publicReadAccess: false,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      }
    );

    // Grant access to cloudfront
    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [siteBucket.arnForObjects('*')],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(
      this,
      `${props.application}-UI-Site-Distribution`,
      {
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
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      }
    );

    distribution.node.addDependency(certificate);
    distribution.node.addDependency(zone);

    // Route53 alias record for the CloudFront distribution
    new ARecord(this, `${props.application}-Site-Alias-Record`, {
      recordName: props.domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone: zone,
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(
      this,
      `${props.application}-UI-Deploy-With-Invalidation`,
      {
        sources: [
          s3deploy.Source.asset('../../../dist/apps/gtech-industries/'),
        ],
        destinationBucket: siteBucket,
        distribution,
        cacheControl: [s3deploy.CacheControl.noCache()],
        memoryLimit: 1024,
      }
    );
  }
}
