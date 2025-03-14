import { TRole, TUser } from './user.interface';
import { UserModel } from './user.model';

// create a user
const registerUser = async (payload: TUser) => {
  return await UserModel.create(payload);
};

// get all users
const getAllUsersFromDB = async () => {
  return await UserModel.find();
};

// get me
const getMe = async (email: string, role: TRole) => {
  let result = null;
  if (role === 'user') {
    result = await UserModel.findOne({ email });
  }
  if (role === 'admin') {
    result = await UserModel.findOne({ email });
  }
  return result;
};

//update profile
const profileUpdate = async (email: string, payload: Partial<TUser>) => {
  return await UserModel.findOneAndUpdate(
    { email },
    { $set: payload },
    { new: true, runValidators: true },
  );
};

export const UserServices = {
  registerUser,
  getAllUsersFromDB,
  getMe,
  profileUpdate,
};
