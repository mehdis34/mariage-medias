// utils/aws-config.ts
import {S3Client} from "@aws-sdk/client-s3";
import {env} from "../env.mjs";

const s3Client = new S3Client({
    region: env.AWS_PREFERRED_REGION,
    credentials: {
        accessKeyId: env.AWS_API_KEY,
        secretAccessKey: env.AWS_API_SECRET
    },
});

export default s3Client;
