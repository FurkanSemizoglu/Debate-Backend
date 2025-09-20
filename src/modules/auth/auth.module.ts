import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { JwtTokenService } from 'src/common/services/jwt-token.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        // Token süreleri JwtTokenService'te tanımlı, burada global ayar kaldırıldı
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtTokenService],
  controllers: [AuthController],
  exports: [AuthService, JwtTokenService] // JwtTokenService'i de export et
})
export class AuthModule {}
