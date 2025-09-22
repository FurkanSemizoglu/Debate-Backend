import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import type { AppConfig } from './config';
import { AllExceptionsFilter } from './common/filters';
import { ResponseInterceptor, LoggingInterceptor } from './common/interceptors';
import { LoggerService } from './common/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  if (!appConfig) {
    throw new Error('App configuration not found');
  }

  const loggerService = app.get(LoggerService);

  app.useGlobalFilters(new AllExceptionsFilter(loggerService));

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new LoggingInterceptor(loggerService)
  );

  app.enableCors({
    origin: appConfig.cors.origins,
    methods: appConfig.cors.methods,
    allowedHeaders: appConfig.cors.allowedHeaders,
    credentials: appConfig.cors.credentials,
  });

  await app.listen(appConfig.port);
  
  loggerService.log(`Application is running on: http://localhost:${appConfig.port}`, {
    port: appConfig.port,
    environment: process.env.NODE_ENV || 'development',
  });
}
bootstrap();
