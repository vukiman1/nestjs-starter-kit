import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { useSwagger } from './app/app.swagger';
import configuration from '@app/config';
import cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: configuration().app.logLevels,
  });

  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  useSwagger(app);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(configuration().app.port);
}
bootstrap();
