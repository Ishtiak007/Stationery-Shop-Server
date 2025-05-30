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

// Update status
const updateUserStatus = async (
  userId: string,
  status: 'active' | 'blocked',
) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    return null;
  }
  user.status = status;
  await user.save();
  return user;
};

// Delete user from the database
const deleteUserFromDB = async (userId: string): Promise<TUser | null> => {
  // Find the user by ID and delete them
  const user = await UserModel.findByIdAndDelete(userId);

  if (!user) {
    return null; // If the user is not found, return null
  }

  return user; // Return the deleted user object
};

// Update status
const updateUserrole = async (userId: string, role: 'admin' | 'user') => {
  const user = await UserModel.findById(userId);
  if (!user) {
    return null;
  }
  user.role = role;
  await user.save();
  return user;
};

export const UserServices = {
  registerUser,
  getAllUsersFromDB,
  getMe,
  profileUpdate,
  updateUserStatus,
  deleteUserFromDB,
  updateUserrole,
};
