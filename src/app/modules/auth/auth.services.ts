import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../../errors/AppError';
import config from '../../config';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import bcrypt from 'bcryptjs';

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

// change password
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistsByCustomEmail(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct

  if (!(await UserModel.isPasswordMatch(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt),
  );

  await UserModel.findOneAndUpdate(
    {
      id: userData.id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
