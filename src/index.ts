import config from './utils/config';
import app from './app';
import logger from './utils/logger';

const PORT = config.PORT;

app.listen(PORT, () => {
    logger.info(`server running on port ${PORT}`);
});