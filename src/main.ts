import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  /*  const app = await NestFactory.create(AppModule); */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api/v1');
  app.useStaticAssets(join(__dirname, '..', 'files'), {
    prefix: '/files/',
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // <- This line here
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Sistema de gestión de portafolio de proyectos PDVSA')
    .setDescription('Descripcion de la API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  const logger = new Logger('Bootstrap');
  app.enableShutdownHooks();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}/api/v1`);
}
bootstrap();
