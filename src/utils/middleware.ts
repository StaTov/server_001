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

export default { requestLogger, unknownEndpoint };