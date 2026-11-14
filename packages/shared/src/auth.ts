import * as z from 'zod';
import { User } from './user.ts';
import { response } from './common.ts';

const Auth = z.object({
  user: User,
  access_token: z.jwt(),
  refresh_token: z.jwt(),
  permissions: z.array(z.string()).nullable()
});

export const RegisterRequest = User.pick({
  first_name: true,
  last_name: true,
  email: true,
  role: true
}).extend({
  password: z.string().min(8)
});

export const LoginRequest = RegisterRequest.pick({
  email: true,
  password: true
});

export const Login = response(Auth);
export const Register = response(Auth);

export type LoginResponse = z.infer<typeof Login>;
export type RegisterResponse = z.infer<typeof Register>;
