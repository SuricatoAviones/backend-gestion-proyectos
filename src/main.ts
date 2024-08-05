import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
 /*  const app = await NestFactory.create(AppModule); */
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.setGlobalPrefix("api/v1")
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
      }
    })
  );
  
  const config = new DocumentBuilder()
    .setTitle('Sistema de gestión de portafolio de proyectos PDVSA')
    .setDescription('Descripcion de la API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.enableCors()

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
