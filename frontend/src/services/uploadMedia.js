import S3 from "react-aws-s3";
import { v4 as uuidv4 } from 'uuid';

const S3_ACCESS_KEY = 'AKIAZO4QIAQW2T45J4CW'
const S3_SECRET_KEY = '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'
const S3_REGION = 'us-east-2'
const S3_BUCKET_NAME = 'rfcbucketv2'
const S3_URL = 'https://rfcbucketv2.s3.amazonaws.com/'
const BASE_IMG_URL = 'https://rfcbucketv2.s3.us-east-2.amazonaws.com/'

const config = {
    bucketName: S3_BUCKET_NAME,
    dirName: "CHAT",
    region: S3_REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    s3Url: S3_URL
}

const ReactS3Client = new S3(config);

export async function uploadMedia(file) {
    const id = uuidv4();
    const name = `${id}_${file.name}`
    const picUrl = BASE_IMG_URL + "CHAT/" + name
    const response = await ReactS3Client.uploadFile(file, name)
    return picUrl
}

export async function deleteMedia(filename) {
    const response = await ReactS3Client.deleteFile(filename)
}