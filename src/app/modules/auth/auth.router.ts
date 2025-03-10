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

export const AuthRoutes = router;
