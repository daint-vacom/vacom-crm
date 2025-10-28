import { PropsWithChildren, useEffect, useState } from 'react';
import { AuthContext } from '@/features/auth/context/auth-context';
import * as authHelper from '@/features/auth/lib/helpers';
import { AuthToken } from '@/features/auth/models/auth.model';
import { IUser, UserRole } from '@/features/auth/models/user.model';
import { AuthAdapter } from '../adapters/auth-adapter';

export function AuthProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<AuthToken | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<IUser | undefined>();
  const [activeRole, setActiveRole] = useState<UserRole | undefined>(
    authHelper.getActiveRole(),
  );

  useEffect(() => {
    if (currentUser && currentUser.roles.length > 0) {
      if (!activeRole || !currentUser.roles.includes(activeRole)) {
        switchRole(currentUser.roles[0]);
      }
    }
  }, [activeRole, currentUser]);

  const verify = async () => {
    if (auth) {
      try {
        const user = await getUser();
        setCurrentUser(user || undefined);
      } catch {
        saveAuth(undefined);
        setCurrentUser(undefined);
      }
    }
  };

  const saveAuth = (auth: AuthToken | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const auth = await AuthAdapter.login(username, password);
      saveAuth(auth.token);
      const user = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw error;
    }
  };

  const getUser = async () => {
    return await AuthAdapter.getCurrentUser();
  };

  const logout = async () => {
    await AuthAdapter.logout();
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    authHelper.setActiveRole(role);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        auth,
        saveAuth,
        user: currentUser,
        setUser: setCurrentUser,
        activeRole,
        setActiveRole: switchRole,
        login,
        getUser,
        logout,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
