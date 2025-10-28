import { createContext, useContext } from 'react';
import { AuthToken } from '@/features/auth/models/auth.model';
import { IUser, UserRole } from '@/features/auth/models/user.model';

// Create AuthContext with types
export const AuthContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  auth?: AuthToken;
  saveAuth: (auth: AuthToken | undefined) => void;
  user?: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  activeRole?: UserRole;
  setActiveRole: (role: UserRole) => void;
  login: (username: string, password: string) => Promise<void>;
  getUser: () => Promise<IUser | null>;
  logout: () => void;
  verify: () => Promise<void>;
}>({
  loading: false,
  setLoading: () => {},
  saveAuth: () => {},
  setUser: () => {},
  setActiveRole: () => {},
  login: async () => {},
  getUser: async () => null,
  logout: () => {},
  verify: async () => {},
});

// Hook definition
export function useAuth() {
  return useContext(AuthContext);
}
