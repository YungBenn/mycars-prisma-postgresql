import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/404.js';
import config from './config/env.js';
import logger from './utils/logger.js';
import userRouter from './routes/user.route.js';
import carRouter from './routes/car.route.js';

const app = express();
const port = config.port;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/car', carRouter);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`server is running on http://localhost:${port}`);
});
