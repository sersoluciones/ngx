export interface AwsData {
  s3?: S3;
  cloudfront?: Cloudfront;
}

export interface S3 {
  bucket: string;
}

export interface Cloudfront {
  id: string;
}
