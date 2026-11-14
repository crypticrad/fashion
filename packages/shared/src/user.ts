import * as z from 'zod';
import { isoDate, response } from './common.ts';

const Role = z.enum(['USER', 'ADMIN', 'SELLER']);
export const User = z.object({
  id: z.cuid2(),
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  email: z.email(),
  createdAt: isoDate,
  updatedAt: isoDate.nullable(),
  role: Role
});

export const UserList = response(z.array(User));

export const UserResponse = response(User.nullable());

export const CreateUser = User.pick({
  first_name: true,
  last_name: true,
  email: true,
  role: true
}).extend({
  password: z.string().min(8)
});

export const UpdateUser = CreateUser.omit({ password: true }).partial();

export type UserTypeResponse = z.input<typeof UserResponse>;
export type UserListResponse = z.input<typeof UserList>;
