import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;
    if (!token) throw new UnauthorizedException('User is not authorized');
    return true;
  }
}
