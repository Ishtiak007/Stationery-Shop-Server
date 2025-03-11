import { Router } from 'express';
import validateRequest from '../../../middlewares/ValidateRequest';
import { AuthValidations } from './auth.validation';
import auth from '../../../middlewares/auth';
import { AuthController } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthController.loginUser,
);

// User logout
router.post('/logout', AuthController.logout);

//change password
router.post(
  '/change-password',
  auth('user'),
  validateRequest(AuthValidations.ChangePassValidationSchema),
  AuthController.changePassword,
);

export const AuthRoutes = router;
