import express from 'express';
import cors from 'cors';
import middleware from './utils/middleware';


const app = express();


// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/', (_req, res) => {
    res.status(200).send('Olya Beautifull');
});

app.use(middleware.unknownEndpoint);

export default app;