import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket } from "aws-cdk-lib/aws-s3"
import { Function, AssetCode, Runtime } from "aws-cdk-lib/aws-lambda"
import { RemovalPolicy } from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsstackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'CDKBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      bucketName: 'cdkbucket0x2b'
    });
    const lambda = new Function(
      this,
      'AccessorCode',
      {
        runtime: Runtime.NODEJS_14_X,
        handler: 'index.handler',
        code: new AssetCode('./bucketAccessorLambda'),
        environment: { BUCKET: bucket.bucketName, KEY: 'some.txt' }
      }
    );
    bucket.grantRead(lambda);
  }
}
