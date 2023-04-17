import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthService, JwtService, LocalStrategy],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
})
export class AuthModule {}
