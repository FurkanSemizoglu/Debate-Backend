import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DebateModule } from './modules/debate/debate.module';
import { DebateRoomModule } from './modules/debate-room/debate-room.module';
import { configuration, configValidation } from './config';
import { LoggerService } from './common/services/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: configValidation.validate,
    }),
    AuthModule, 
    UserModule, 
    DebateModule,
    DebateRoomModule
  ],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {}
