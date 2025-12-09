import * as cdk from 'aws-cdk-lib';
import { CdkMultiEnvDemoStack } from './cdk-multi-env-demo-stack';
import { Construct } from 'constructs';

export class CdkMultiEnvStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new CdkMultiEnvDemoStack(this, 'DemoStack');
  }
}
