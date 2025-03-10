import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import router from './router/routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import NotFound from './middlewares/NotFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// application routes
app.use('/api', router);

app.use(globalErrorHandler);

//Not Found
app.use(NotFound);

export default app;
