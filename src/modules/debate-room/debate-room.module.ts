import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DebateRoomService } from './debate-room.service';
import { DebateRoomController } from './debate-room.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DebateRoomService],
  controllers: [DebateRoomController],
  exports: [DebateRoomService],
})
export class DebateRoomModule {}