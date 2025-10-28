export interface IUser {
  username: string;
  roles: UserRole[];
}

export const USER_ROLES = {
  ADMIN: 'ADMIN',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [USER_ROLES.ADMIN]: 'Quản Trị Viên',
};
