import { IUser, USER_ROLES } from '@/features/auth/models/user.model';
import { loginApi } from '@/features/auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { getAuth } from '../lib/helpers';

export const AuthAdapter = {
  login: async (username: string, password: string) => {
    try {
      const token = await loginApi({ username, password });
      return token;
    } catch (error) {
      throw error;
    }
  },

  register: async () => {
    throw new Error('Registration is disabled in mock mode');
  },

  getCurrentUser: async (): Promise<IUser> => {
    const token = getAuth();
    if (!token) throw new Error('Not logged in');
    const payload = jwtDecode(token.accessToken) as any;
    console.log('Decoded JWT payload:', payload);
    if (!payload?.preferred_username) {
      throw new Error('Invalid token payload');
    }

    return {
      username: payload.preferred_username,
      roles: [USER_ROLES.ADMIN],
    };
  },

  logout: async () => {
    // await logoutApi();
  },

  requestPasswordReset: async () => {
    console.warn('Mock: password reset requested');
  },

  resetPassword: async () => {
    console.warn('Mock: password reset');
  },

  resendVerificationEmail: async () => {
    console.warn('Mock: resend verification');
  },
};
