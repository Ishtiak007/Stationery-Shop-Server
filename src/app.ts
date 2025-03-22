import express, { Request, Response } from 'express';
const app = express();
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './router/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import NotFound from './middlewares/NotFound';

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: 'https://stationery-shop-frontend-beta.vercel.app', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

//test route
const test = async (req: Request, res: Response) => {
  const hello = 'Hello I am Ishtiak. From Rangpur, Bangladesh';
  res.send(hello);
};

app.get('/', test);

//application routes
app.use('/api', router);

//
//gloabal err handler
app.use(globalErrorHandler);

//Not Found Route
app.use(NotFound);

export default app;
