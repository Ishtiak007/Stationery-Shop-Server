import AppError from '../../../errors/AppError';
import config from '../../config';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

//login user
const loginUser = async (payload: TLoginUser) => {
  //   check if user exist
  const user = await UserModel.isUserExistsByCustomEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //check user is blocked
  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // check if password match
  const storedHashedPassword = user.password;
  if (
    !(await UserModel.isPasswordMatch(payload.password, storedHashedPassword))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  // access granted:send accestoken,refreshtoken

  const JwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accesToken = createToken(
    JwtPayload,
    config.access_token_secret as string,
    config.access_token_expires as string,
  );

  const refreshToken = createToken(
    JwtPayload,
    config.access_token_secret as string,
    config.refresh_token_expires as string,
  );

  return {
    accesToken,
    refreshToken,
  };
};

export const AuthServices = {
  loginUser,
};
