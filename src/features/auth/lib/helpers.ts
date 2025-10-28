import { AuthToken } from '@/features/auth/models/auth.model';
import { getData, setData } from '@/lib/storage';
import { IUser, UserRole } from '../models/user.model';
import KEY_STORAGE from './config';

/**
 * Get stored auth information from local storage
 */
const getAuth = (): AuthToken | undefined => {
  try {
    const auth = getData(KEY_STORAGE.AUTH_TOKEN) as AuthToken | undefined;
    return auth;
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
  }
};

/**
 * Save auth information to local storage
 */
const setAuth = (auth: AuthToken) => {
  setData(KEY_STORAGE.AUTH_TOKEN, auth);
};

/**
 * Remove auth information from local storage
 */
const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(KEY_STORAGE.AUTH_TOKEN);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

const hasRole = (user: IUser | null, role: UserRole): boolean => {
  return !!user?.roles.includes(role);
};

const hasAnyRole = (user: IUser | null, roles: UserRole[]): boolean => {
  return roles.some((r) => user?.roles.includes(r));
};

const getActiveRole = (): UserRole | undefined => {
  try {
    const role = getData(KEY_STORAGE.ACTIVE_ROLE) as UserRole | undefined;
    return role;
  } catch (error) {
    console.error('ACTIVE ROLE LOCAL STORAGE PARSE ERROR', error);
  }
};

const setActiveRole = (role: UserRole) => {
  setData(KEY_STORAGE.ACTIVE_ROLE, role);
};

export {
  getAuth,
  removeAuth,
  setAuth,
  hasRole,
  hasAnyRole,
  getActiveRole,
  setActiveRole,
};
