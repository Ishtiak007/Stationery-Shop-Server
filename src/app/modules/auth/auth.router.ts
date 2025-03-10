import { Router } from 'express';
import validateRequest from '../../../middlewares/ValidateRequest';
import { AuthValidations } from './auth.validation';
import auth from '../../../middlewares/auth';

const router = Router();

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthController.loginUser,
);

router.post('/logout', AuthController.logout);

router.post(
  '/change-pass',
  auth('user'),
  validateRequest(AuthValidations.ChangePassValidationSchema),
  AuthController.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
