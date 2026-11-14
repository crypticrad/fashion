import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module.ts';
import { AuthController } from './auth.controller.ts';
import { AuthService } from './auth.service.ts';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory(config: ConfigService) {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '15m',
          },
        };
      },
      global: true,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
