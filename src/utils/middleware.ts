import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import  { findByToken } from '../models/user';
import { merge } from 'lodash';

export class AppError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}

// logger request
const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
    logger.info('Method: ', req.method);
    logger.info('Url: ', req.url);
    logger.info('Body: ', req.body);
    logger.info('Cookie: ', req.cookies);
    logger.info('---');
    next();
};

// require JSON to request
const requireJsonContent = (
    request: Request,
    response: Response,
    next: NextFunction) => {
    if (request.headers['content-type'] !== 'application/json') {
        response.status(400).send('Server requires application/json');
    } else {
        next();
    }
};

//isAuthenticated
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {

    const sessionToken = req.cookies['STATOV-AUTH'] as string;
    if (!sessionToken) {
        return res.sendStatus(403);
    }
    const existUser = await findByToken(sessionToken);
    if (!existUser) {
        return res.sendStatus(403);
    }
    merge(req, { identity: existUser });

    return next();
};

// error heandler
const errorHeandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {

    logger.error('Error name', err.name);

    if (err.name === 'MongoServerError') {
        return res.status(400).json({ error: err.message });
    }
    if (err.name === 'CastError') {
        return res.status(404).json({ error: err.message });
    }
    if (err instanceof AppError) {
        const status = err.statusCode;
        res.status(status).json({ error: err.message });
        return;
    }
    if (err instanceof Error) {
        res.status(400).json({ error: err.message });
        return;
    }
    return next(err);
};

// handler unknown point
const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
};


export default { requestLogger, unknownEndpoint, errorHeandler, requireJsonContent };