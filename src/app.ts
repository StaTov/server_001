import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import middleware from './utils/middleware';
import logger from './utils/logger';
import config from './utils/config';
import userRouter from './routes/users';
import cookieParser from 'cookie-parser';

const app = express();


logger.info('connecting to MongoDB');

const URI = config.MONGODB_URI || 'missing url';

mongoose.connect(URI)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error: unknown) => {
        if (error instanceof Error) {
            logger.error('error connecting to MongoDB:', error.message);
        }
    });

app.use(cors({credentials: true}));
app.use(cookieParser());
app.use(express.json());
app.use(middleware.requestLogger);


app.use('/user', userRouter);

app.use(middleware.errorHeandler);
app.use(middleware.unknownEndpoint);

export default app;