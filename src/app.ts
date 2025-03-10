import express, { Request, Response } from 'express';
const app = express();
import globalErrorHandler from './middlewares/globalErrorHandler';
import NotFound from './middlewares/NotFound';
import router from './router/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

//test route
const test = async (req: Request, res: Response) => {
  const sayHi = 'Hello I am Ishtiak Ahmed From Rangpur, Bangladesh ✨';
  res.send(sayHi);
};

app.get('/', test);

//application routes
app.use('/api', router);

//gloabal err handler
app.use(globalErrorHandler);

//Not Found Route
app.use(NotFound);

export default app;
