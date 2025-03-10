import catchAsync from '../../../utility/catchAsync';
import sendResponse from '../../../utility/sendResponse';

// Create User -register
const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUser(req.body);
  const isTrue: boolean = result ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue
      ? 'User Registered successfully done!'
      : 'Registration failed!',
    data: isTrue ? result : [],
  });
});

export const UserController = {
  registerUser,
};
