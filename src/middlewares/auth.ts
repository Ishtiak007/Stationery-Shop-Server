import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utility/catchAsync';
import { TuserRole } from '../app/modules/user/user.interface';
import AppError from '../errors/AppError';
import config from '../app/config';
import { UserModel } from '../app/modules/user/user.model';

const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //check if token sent from the client
    if (!token) {
      throw new AppError(
        500,
        'Forbidden',
        'You are not authorized to access this route',
      );
    }

    // Verify the token asynchronously
    const decoded = jwt.verify(
      token,
      config.access_token_secret as string,
    ) as JwtPayload;
    //check if the user has the required role to access the route

    const { role, email, iat } = decoded;
    // checking if the user is exist
    const user = await UserModel.isUserExistsByCustomEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = user;
    next();
  });
};

export default auth;
