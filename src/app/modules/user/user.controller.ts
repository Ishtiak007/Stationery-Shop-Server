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

// delete
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params; // Retrieve the user ID from params

  const result = await deleteUserFromDB(userId); // Call the service to delete the user

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User not found!',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
  });
});

export const UserController = {
  registerUser,
  getAllUser,
  getMe,
  updateProfile,
  deleteUser,
};
