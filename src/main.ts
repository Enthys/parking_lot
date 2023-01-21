import * as dotenv from 'dotenv';

dotenv.config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(ValidationPipe);

  if (process.env.APP_MODE === 'development') {
    SwaggerModule.setup(
      'specz',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle('Parking Lot')
          .setVersion('1.0')
          .addTag('parking lot')
          .build(),
      ),
    );
  }

  await app.listen(80);
}

bootstrap();
