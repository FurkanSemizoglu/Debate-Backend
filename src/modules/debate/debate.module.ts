import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { DebateService } from './debate.service';
import { DebateController } from './debate.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [DebateService],
  controllers: [DebateController],
  exports: [DebateService]
})
export class DebateModule {}
