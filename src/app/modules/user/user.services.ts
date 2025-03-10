import { TUser } from './user.interface';
import { UserModel } from './user.model';

const registerUser = async (payload: TUser) => {
  return await UserModel.create(payload);
};

const getAllUsersFromDB = async () => {
  return await UserModel.find();
};

export const UserServices = {
  registerUser,
  getAllUsersFromDB,
};
