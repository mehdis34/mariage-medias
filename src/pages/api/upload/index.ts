import {NextApiRequest, NextApiResponse} from "next";
import {File, IncomingForm} from "formidable";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import s3Client from "../../../../utils/aws-config";
import cors, {runMiddleware} from "../../../../utils/cors";
import {env} from "../../../../env.mjs";
import {promisify} from "util";
import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import sharp from "sharp";

export const config = {
    api: {
        bodyParser: false, // Désactiver le bodyParser intégré de Next.js pour traiter les fichiers avec formidable
    },
};

const readFile = promisify(fs.readFile);

const compressImage = async (fileBuffer: Buffer) => {
    return sharp(fileBuffer)
        .resize({width: 2000})
        .jpeg({quality: 80}) // Convertir en JPEG avec une qualité de 80%
        .toBuffer();
};

const uploadFileToS3 = async (file: File, isImage: boolean) => {
    const fileBuffer = await readFile(file.filepath);
    const fileExtension = path.extname(file.originalFilename || '');
    const newFileName = `${uuidv4()}${fileExtension}`;
    const fileContent = isImage ? await compressImage(fileBuffer) : fileBuffer;

    const command = new PutObjectCommand({
        Bucket: env.AWS_BUCKET,
        Key: `medias/guests/${newFileName}`,
        Body: fileContent
    });

    return s3Client.send(command);
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await runMiddleware(req, res, cors);

        if (req.method === 'POST') {
            const form = new IncomingForm();

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error("Error parsing form:", err);
                    return res.status(500).json({success: false, error: 'Error parsing form'});
                }

                const fileArray = Array.isArray(files.files) ? files.files : [files.files];

                try {
                    await Promise.all(fileArray.map(async (file: any) => {
                        const isImage = ['.jpg', '.jpeg', '.png'].includes(path.extname(file.originalFilename || '').toLowerCase());
                        return uploadFileToS3(file, isImage);
                    }));
                    res.status(200).json({success: true, message: 'Files uploaded successfully'});
                } catch (uploadError) {
                    console.error("Error uploading file(s) to S3:", uploadError);
                    res.status(500).json({success: false, error: 'Error uploading file(s) to S3'});
                }
            });
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
}
