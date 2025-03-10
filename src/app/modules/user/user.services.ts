import { TUser } from './user.interface';
import { UserModel } from './user.model';

// create a user
const registerUser = async (payload: TUser) => {
  return await UserModel.create(payload);
};

// get all users
const getAllUsersFromDB = async () => {
  return await UserModel.find();
};

export const UserServices = {
  registerUser,
  getAllUsersFromDB,
};
