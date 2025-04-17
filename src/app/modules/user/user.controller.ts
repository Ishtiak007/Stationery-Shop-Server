import { Request, Response } from 'express';
import AppError from '../../../errors/AppError';
import catchAsync from '../../../utility/catchAsync';
import sendResponse from '../../../utility/sendResponse';
import { deleteUserFromDB, UserServices } from './user.services';

// Create User -register
const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUser(req.body);
  const isTrue: boolean = result ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue
      ? 'User Registered successfully done!'
      : 'Failed to registered!',
    data: isTrue ? result : [],
  });
});

//find all user
const getAllUser = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB();
  const isTrue: boolean = users ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 504,
    success: isTrue,
    message: isTrue ? 'Users retrieved Successfully!' : 'You are forbidden',
    data: isTrue ? users : [],
  });
});

// get me
const getMe = catchAsync(async (req, res) => {
  const { email, role } = req.user;
  const user = await UserServices.getMe(email, role!);
  const isTrue: boolean = user ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 504,
    success: isTrue,
    message: isTrue ? 'User retrieved Successfully!' : 'You are forbidden',
    data: isTrue ? user : [],
  });
});

//update profiel
const updateProfile = catchAsync(async (req, res) => {
  const { role } = req.body;
  if (role === 'admin' && req.user.role != 'admin') {
    throw new AppError(504, 'Only Admin can change the role!');
  }
  const user = await UserServices.profileUpdate(req.user.email, req.body);
  const isTrue: boolean = user ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 504,
    success: isTrue,
    message: isTrue
      ? 'Users profile Updated Successfully!'
      : 'You are forbidded',
    data: isTrue ? user : [],
  });
});

// Delete User
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params; // Get the user ID from URL parameters

  // Call the service to delete the user
  const result = await UserServices.deleteUserFromDB(userId);

  if (!result) {
    throw new AppError(404, 'User not found'); // If user is not found, throw error
  }

  // Send response with success message
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
  });
});

// Update status
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { status } = req.body;
  if (!status || !['active', 'blocked'].includes(status)) {
    throw new AppError(400, 'Invalid status value. Use "active" or "blocked".');
  }
  const updatedUser = await UserServices.updateUserStatus(userId, status);

  if (!updatedUser) {
    throw new AppError(404, 'User not found.');
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `User status updated to ${status}`,
    data: updatedUser,
  });
});

export const UserController = {
  registerUser,
  getAllUser,
  getMe,
  updateProfile,
  deleteUser,
  updateUserStatus,
};
