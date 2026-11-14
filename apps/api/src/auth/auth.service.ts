import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.ts';
import { PrismaService } from '../prisma/prisma.service.ts';
import { JwtService } from '@nestjs/jwt';
import { verify } from '@node-rs/argon2';
import { FieldOutputTypes } from '../prisma/contract.js';
import { createHash, randomBytes } from 'crypto';
import { RegisterRequestDto } from './auth.dto.ts';

type User = FieldOutputTypes['public']['User'];
const sha256 = (v: string) => createHash('sha256').update(v).digest('hex');

@Injectable()
export class AuthService {
  // [Todo]: Move the refresh token approach to database model
  private readonly refresh_tokens: Map<string, {}> = new Map();

  constructor(
    private readonly userService: UsersService,
    private readonly jtwService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  private issueRefreshToken(id: string) {
    const token = randomBytes(32).toString('base64url');
    this.refresh_tokens.set(sha256(token), {
      userId: id,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });
    return token;
  }

  private consumeRefreshToken(token: string) {
    const hash = sha256(token);
    const entry = this.refresh_tokens.get(hash) as {
      userId: string;
      expiresAt: number;
    };
    this.refresh_tokens.delete(hash);
    if (!entry || entry.expiresAt < Date.now()) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return entry.userId;
  }
  private createTokens(user: User) {
    const payload: Partial<User> = {
      email: user.email,
      first_name: user.first_name,
      last_name: user?.last_name,
      role: user?.role,
      createdAt: user?.createdAt,
      id: user?.id,
    };
    const access_token = this.jtwService.sign(payload);
    const refresh_token = this.issueRefreshToken(user.id);

    return { access_token, refresh_token };
  }

  async login(params: { email: string; password: string }): Promise<
    | {
        user: User;
        access_token: string;
        refresh_token: string;
      }
    | undefined
  > {
    const user = await this.prisma.db.orm.public.User.where({
      email: params.email,
    }).first();
    if (!user) throw new NotFoundException('User not found');
    // [Todo]: Set password workflow
    if (!user.password)
      throw new NotAcceptableException('User has not set a password');
    if (!(await verify(user.password, params.password))) {
      throw new UnauthorizedException(
        'Unable to login check email or password',
      );
    }
    return { user, ...this.createTokens(user) };
  }
  async register(params: RegisterRequestDto) {
    const { first_name, last_name, email, password, role } = params;
    if (await this.userService.listByEmail(email))
      throw new ConflictException('User already exists, please login');
    const user = await this.userService.create({
      email,
      first_name,
      last_name,
      password,
      role: role ?? 'USER',
    });

    return user;
  }
}
