import { TUser } from '../app/modules/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: TUser;
    }
  }
}
