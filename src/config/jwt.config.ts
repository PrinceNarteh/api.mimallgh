import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      secret: configService.get<string>('AUTH_JWT_SECRET'),
      signOptions: {
        expiresIn: '15m',
      },
    };
  },
};
