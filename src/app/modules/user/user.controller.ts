import catchAsync from '../../../utility/catchAsync';
import sendResponse from '../../../utility/sendResponse';
import { UserServices } from './user.services';

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

export const UserController = {
  registerUser,
};
