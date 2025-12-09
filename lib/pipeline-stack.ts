import * as cdk from "aws-cdk-lib";
import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { CdkMultiEnvStage } from "./stages";

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "MultiEnvPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("dishakamra/cdk-multi-env-demo", "master"),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const dev = new CdkMultiEnvStage(this, 'DevStage', { env: { account: process.env.CDK_DEV_ACCT, region: 'us-east-2' }});
    const stage = new CdkMultiEnvStage(this, 'StageStage', { env: { account: process.env.CDK_STAGE_ACCT, region: 'us-west-1' }});
    const prod = new CdkMultiEnvStage(this, 'ProdStage', { env: { account: process.env.CDK_PROD_ACCT, region: 'us-west-2' }});

    pipeline.addStage(dev);
    pipeline.addStage(stage);
    pipeline.addStage(prod);
  }
}
