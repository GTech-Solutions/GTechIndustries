import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Tags } from 'aws-cdk-lib';

export class DynamoTables extends cdk.Stack {
    constructor(
        scope: Construct,
        id: string,

        props?: cdk.StackProps
    ) {
        super(scope, id, props);

        //ToDo abstract tags to higher class
        const application = this.node.tryGetContext('application') as string;
        const environment = this.node.tryGetContext('environment') as string;

        Tags.of(scope).add('environment', environment);
        Tags.of(scope).add('application', application);
        Tags.of(scope).add('classification', 'Public');
        Tags.of(scope).add('creator', 'Mike G');
        Tags.of(scope).add('automation', 'AWS CDK');

        const dynamoDbTable = new cdk.aws_dynamodb.Table(this, 'gtech-direct-api-table', {
            tableName: 'GTECH_DIRECT_API_LIST',
            partitionKey: {
                name: 'API_ID',
                type: cdk.aws_dynamodb.AttributeType.STRING,
            },
            billingMode: cdk.aws_dynamodb.BillingMode.PROVISIONED,
        });
    }
}
