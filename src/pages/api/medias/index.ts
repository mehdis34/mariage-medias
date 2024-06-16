import {NextApiRequest, NextApiResponse} from "next";
import {GetObjectCommand, paginateListObjectsV2, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {env} from "../../../../env.mjs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const {continuationToken} = req.query;

        const s3Client = new S3Client({
            credentials: {
                accessKeyId: env.AWS_API_KEY,
                secretAccessKey: env.AWS_API_SECRET
            },
            region: env.AWS_PREFERRED_REGION,
        });
        const files = [];

        const paginator = paginateListObjectsV2({
            client: s3Client
        }, {
            Bucket: env.AWS_BUCKET,
            Prefix: "medias/",
            ContinuationToken: (continuationToken || undefined) as string | undefined,
            MaxKeys: 20
        });

        let lastContinuationToken = null;
        for await (const data of paginator) {
            const fileUrls = await Promise.all((data.Contents ?? []).filter(file => {
                return file.Size !== 0 && !file.Key?.endsWith('/');
            }).map(async file => {
                const command = new GetObjectCommand({
                    Bucket: env.AWS_BUCKET,
                    Key: file.Key
                });
                const url = await getSignedUrl(s3Client, command, {expiresIn: 3600});
                return {
                    key: file.Key,
                    url
                };
            }));
            files.push(...fileUrls);
            lastContinuationToken = data.NextContinuationToken;
        }

        res.status(200).json({
            files,
            continuationToken: lastContinuationToken
        });
    } catch (err: any) {
        res.status(422).json({
            success: false,
            error: err.toString()
        });
    }
}
