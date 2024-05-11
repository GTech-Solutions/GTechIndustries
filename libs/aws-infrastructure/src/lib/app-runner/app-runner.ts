import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import { IgnoreMode, Tags } from 'aws-cdk-lib';
import * as cdkawsapprunner from 'aws-cdk-lib/aws-apprunner';
import * as path from 'path';
import { CfnService } from 'aws-cdk-lib/aws-apprunner';
import { AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import ImageConfigurationProperty = CfnService.ImageConfigurationProperty;

export class AppRunner extends cdk.Stack {
    constructor(
        scope: Construct,
        id: string,
        apiName: string,
        dockerFile: string,
        dockerFilePath: string,
        imageConfiguration: ImageConfigurationProperty,
        networkConfiguration: CfnService.NetworkConfigurationProperty,
        props?: cdk.StackProps
    ) {
        super(scope, id, props);

        const roleForAppRunner = this.node.tryGetContext('roleForAppRunner') as string;
        const appRunnerECRAccessRole = this.node.tryGetContext('appRunnerECRAccessRole') as string;
        const application = this.node.tryGetContext('application') as string;
        const environment = this.node.tryGetContext('environment') as string;

        Tags.of(scope).add('environment', environment);
        Tags.of(scope).add('application', application);
        Tags.of(scope).add('classification', 'Public');
        Tags.of(scope).add('creator', 'Mike G');
        Tags.of(scope).add('automation', 'AWS CDK');

        const imageAsset = new DockerImageAsset(this, 'gtech-direct-api', {
            ignoreMode: IgnoreMode.DOCKER,
            file: dockerFile,
            directory: path.join(__dirname, dockerFilePath),
        });

        //ToDo pass in from github actions
        const vpcConnector = new cdkawsapprunner.CfnVpcConnector(this, 'vpc-connector', {
            subnets: ['subnet-04281291aef406753', 'subnet-092ca08385ee7bc01', 'subnet-0b0f8bc727811af9f', 'subnet-07429cc57e5ba1c5a'],
        });

        const appRunnerService = new cdkawsapprunner.CfnService(this, 'gtech-direct-api-app-runner', {
            networkConfiguration: {
                ...networkConfiguration,
                egressConfiguration: { vpcConnectorArn: vpcConnector.attrVpcConnectorArn, egressType: 'VPC' },
            },
            serviceName: `gtech-${apiName}-api`,
            instanceConfiguration: {
                instanceRoleArn: roleForAppRunner,
            },
            sourceConfiguration: {
                autoDeploymentsEnabled: true,
                imageRepository: {
                    imageIdentifier: imageAsset.imageUri,
                    imageRepositoryType: 'ECR',
                    imageConfiguration: imageConfiguration,
                },
                authenticationConfiguration: {
                    accessRoleArn: appRunnerECRAccessRole,
                },
            },
        });

        const dynamoEntry = new cdk.custom_resources.AwsCustomResource(this, 'table-entry', {
            onCreate: {
                service: 'DynamoDB',
                action: 'putItem',
                parameters: {
                    TableName: 'GTECH_DIRECT_API_LIST',
                    Item: {
                        API_ID: { S: apiName },
                        API_ENDPOINT: { S: appRunnerService.attrServiceUrl },
                    },
                },
                physicalResourceId: PhysicalResourceId.of('GTECH_DIRECT_API_LIST' + '_initialization'),
            },
            policy: AwsCustomResourcePolicy.fromSdkCalls({
                resources: AwsCustomResourcePolicy.ANY_RESOURCE,
            }),
        });
    }
}
