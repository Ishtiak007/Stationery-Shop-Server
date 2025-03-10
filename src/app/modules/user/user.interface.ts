import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TRole = 'admin' | 'user';
export type TuserStatus = 'active' | 'blocked';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: TRole;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  status?: TuserStatus;
  isDeleted?: boolean;
}

export interface UserInterfaceModel extends Model<TUser> {
  isUserExistsByCustomEmail: (email: string) => Promise<TUser>;
  isPasswordMatch: (
    password: string,
    storedHashedPassword: string,
  ) => Promise<boolean>;
  isDeletedUser: (id: string) => Promise<boolean>;
}

export type TuserRole = keyof typeof USER_ROLE;
