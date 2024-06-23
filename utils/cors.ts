// lib/cors.ts
import Cors from 'cors';
import {NextApiRequest, NextApiResponse} from 'next';

// Initialiser le middleware CORS
const cors = Cors({
    methods: ['POST'],
    origin: '*', // Remplacez par votre domaine autorisé ou utilisez une fonction pour des règles plus complexes
    optionsSuccessStatus: 200,
});

// Helper pour attendre le middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    return new Promise<void>((resolve, reject) => {
        fn(req, res, (result: Error) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve();
        });
    });
}

export default cors;
export {runMiddleware};
