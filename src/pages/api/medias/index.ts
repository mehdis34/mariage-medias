import {NextApiRequest, NextApiResponse} from "next";
import {GetObjectCommand, paginateListObjectsV2} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {env} from "../../../../env.mjs";
import s3Client from "../../../../utils/aws-config";
import mime from "mime-types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const {continuationToken, folder} = req.query;

        const files = [];

        const paginator = paginateListObjectsV2({
            client: s3Client
        }, {
            Bucket: env.AWS_BUCKET,
            Prefix: "medias/" + folder + '/',
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
                const fileType = mime.lookup(file.Key as string) || 'application/octet-stream';
                return {
                    key: file.Key,
                    url,
                    type: fileType
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
