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

export const RefreshRequest = z.object({
  refresh_token: z.string().nonempty()
});
export const LogoutRequest = z.object({
  access_token: z.string().nonempty()
});

export const LoginResponse = response(Auth);
export const RegisterResponse = response(Auth.pick({ user: true }));
export const RefreshResponse = response(
  Auth.omit({
    user: true,
    permissions: true
  })
);
export const LogoutResponse = response(
  z.object({
    userId: z.string()
  })
);

export type LoginTypeRequest = z.infer<typeof LoginRequest>;
export type LoginTypeResponse = z.infer<typeof LoginResponse>;

export type RegisterTypeResponse = z.infer<typeof RegisterRequest>;
export type RegisterTypeRequest = z.infer<typeof RegisterResponse>;

export type RefreshTypeRequest = z.infer<typeof RefreshRequest>;
export type RefreshTypeResponse = z.infer<typeof RefreshResponse>;

export type LogoutTypeResponse = z.infer<typeof LogoutResponse>;
export type LogoutTypeRequest = z.infer<typeof LogoutRequest>;
