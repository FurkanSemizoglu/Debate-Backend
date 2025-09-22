import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import type { AppConfig } from './config';
import { AllExceptionsFilter } from './common/filters';
import { ResponseInterceptor } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  if (!appConfig) {
    throw new Error('App configuration not found');
  }

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors({
    origin: appConfig.cors.origins,
    methods: appConfig.cors.methods,
    allowedHeaders: appConfig.cors.allowedHeaders,
    credentials: appConfig.cors.credentials,
  });

  await app.listen(appConfig.port);
  console.log(`Application is running on: http://localhost:${appConfig.port}`);
}
bootstrap();
