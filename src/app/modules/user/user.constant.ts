import { TRole, TuserStatus } from './user.interface';

export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;
export const Role: TRole[] = ['admin', 'user'];
export const Status: TuserStatus[] = ['active', 'blocked'];
