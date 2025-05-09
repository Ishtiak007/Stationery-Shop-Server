/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// import { Request, Response, NextFunction } from 'express';
// import httpStatus from 'http-status';

// const NotFound = (req: Request, res: Response, next: NextFunction) => {
//   return res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: 'Api not found',
//     error: '',
//   });
// };

// export default NotFound;

import { Request, Response, NextFunction } from 'express';

const NotFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorSources: [
      {
        path: req.originalUrl,
        message: 'API endpoint not found',
      },
    ],
  });
};

export default NotFound;
