import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
    logger.info('Method: ', req.method);
    logger.info('Url: ', req.url);
    logger.info('Body: ', req.body);
    logger.info('---');
    next();
};
const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

const errorHeandler = (err: Error, _req: Request, res: Response) => {
    console.error('err.message', err.message);
    console.error('err.name', err.name);
    res.send(err.message);
};

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

export default { requestLogger, unknownEndpoint, errorHeandler, requireJsonContent };