import * as z from 'zod';
import { User } from './user.ts';
import { response } from './common.ts';

const Auth = z.object({
  user: User.nullable(),
  access_token: z.jwt(),
  refresh_token: z.string(),
  permissions: z.array(z.string()).nullable()
});

export const RegisterRequest = User.pick({
  first_name: true,
  last_name: true,
  email: true,
  role: true
})
  .extend({
    password: z.string()
  })
  .partial({
    role: true
  });

export const LoginRequest = RegisterRequest.pick({
  email: true,
  password: true
});

export const LoginResponse = response(Auth);
export const RegisterResponse = response(Auth.pick({ user: true }));

export type LoginTypeResponse = z.infer<typeof LoginResponse>;
export type RegisterTypeResponse = z.infer<typeof RegisterResponse>;
