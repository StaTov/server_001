import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import middleware from './utils/middleware';
import logger from './utils/logger';
import config from './utils/config';


const app = express();

logger.info('connecting to MongoDB');

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error: unknown) => {
        if (error instanceof Error) {
            logger.error('error connecting to MongoDB:', error.message);
        }
    });

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);



app.get('/', (_req, res) => {
    res.status(200).send('success');
});

app.use(middleware.unknownEndpoint);

export default app;