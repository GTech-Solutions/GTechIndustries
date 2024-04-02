# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

To deploy the Github Access role for Actions run this:
npx cdk deploy GithubAccessRoleStack -c environment=develop -c application=mui.gtech-solutions -c githubOwner=GTech-Solutions -c githubRepo=GTechIndustries --exclusively
