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

// delete user
export const deleteUserFromDB = async (
  userId: string,
): Promise<TUser | null> => {
  const result = await UserModel.findByIdAndDelete(userId); // Find and delete the user by ID
  return result; // Return the result (the deleted user or null if not found)
};

export const UserServices = {
  registerUser,
  getAllUsersFromDB,
  getMe,
  profileUpdate,
};
