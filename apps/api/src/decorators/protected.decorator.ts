import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard.ts';

/**
 * Requires a valid access token. Use on a controller (all its routes) or a
 * single route. Also marks the route(s) as bearer-protected in Swagger.
 */
export const Protected = () =>
  applyDecorators(UseGuards(AuthGuard), ApiBearerAuth());
