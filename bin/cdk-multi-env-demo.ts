#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkMultiEnvDemoStack } from '../lib/cdk-multi-env-demo-stack';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();

// Define three environments
const devEnv = { account: process.env.CDK_DEV_ACCT, region: 'us-east-2' };
const stageEnv = { account: process.env.CDK_STAGE_ACCT, region: 'us-west-1' };
const prodEnv = { account: process.env.CDK_PROD_ACCT, region: 'us-west-2' };

new CdkMultiEnvDemoStack(app, 'DemoStack-Dev', { env: devEnv });
new CdkMultiEnvDemoStack(app, 'DemoStack-Stage', { env: stageEnv });
new CdkMultiEnvDemoStack(app, 'DemoStack-Prod', { env: prodEnv });

new PipelineStack(app, 'PipelineStack', {
  env: {
    account: process.env.CDK_DEV_ACCT,
    region: 'us-east-2',
  }
})
