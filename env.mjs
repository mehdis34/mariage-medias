import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
    server: {
        AWS_API_KEY: z.string().min(1),
        AWS_API_SECRET: z.string().min(1),
        AWS_BUCKET: z.string().min(1),
        AWS_PREFERRED_REGION: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string().min(1),
        NEXT_PUBLIC_APP_NAME: z.string().min(1),
    },
    runtimeEnv: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
        AWS_API_KEY: process.env.AWS_API_KEY,
        AWS_API_SECRET: process.env.AWS_API_SECRET,
        AWS_BUCKET: process.env.AWS_BUCKET,
        AWS_PREFERRED_REGION: process.env.AWS_PREFERRED_REGION,
    },
});
