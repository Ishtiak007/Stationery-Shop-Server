import catchAsync from '../../../utility/catchAsync';
import sendResponse from '../../../utility/sendResponse';
import config from '../../config';
import { AuthServices } from './auth.services';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accesToken, refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: accesToken ? 200 : 500,
    success: true,
    message: accesToken ? 'login successful' : 'you are not an authorized user',
    data: accesToken ? { token: accesToken } : [],
  });
});

export const AuthController = {
  loginUser,
};
