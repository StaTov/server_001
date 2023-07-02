import { Request, Response, NextFunction } from 'express';
import logger from './logger';


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

// error heandler
const errorHeandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {

    logger.error('Error name', err.name);

    if (err.name === 'MongoServerError') {
        return res.status(400).send({ error: 'username must be unique' });
    }
    if (err.name === 'CastError') {
        return res.status(404).send({ error: 'malformatted id' });
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
    next(err);
    return;
};

// handler unknow point
const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
};


export default { requestLogger, unknownEndpoint, errorHeandler, requireJsonContent };