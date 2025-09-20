import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DebateModule } from './modules/debate/debate.module';
import { DebateRoomModule } from './modules/debate-room/debate-room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, 
    UserModule, 
    DebateModule,
    DebateRoomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
