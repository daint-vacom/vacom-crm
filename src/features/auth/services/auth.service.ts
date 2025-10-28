import { AuthToken } from '@/features/auth/models/auth.model';
import { ChangePasswordSchemaType } from '@/features/auth/schemas/change-password.schema';
import { SigninSchemaType } from '@/features/auth/schemas/signin.schema';
import { baseServerAxios, serverApiAxios } from '@/utilities/axios/server-api';

export const loginApi = async (schema: SigninSchemaType) => {
  const response = await baseServerAxios.post('/connect/token', {
    ...schema,
    grant_type: 'password',
    client_id: 'Vacom_App',
    scope: 'Vacom',
  });

  return {
    token: {
      accessToken: response.data.access_token,
    } as AuthToken,
  };
};

export const logoutApi = async () => {
  return await serverApiAxios.post('/api/v1/auth/logout');
};

export const changePasswordApi = async (schema: ChangePasswordSchemaType) => {
  return serverApiAxios.post(`/api/v1/auth/changepassword`, schema);
};
