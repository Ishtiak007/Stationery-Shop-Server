import { TUser } from './user.interface';
import { UserModel } from './user.model';

const registerUser = async (payload: TUser) => {
  return await UserModel.create(payload);
};

export const UserServices = {
  registerUser,
};
