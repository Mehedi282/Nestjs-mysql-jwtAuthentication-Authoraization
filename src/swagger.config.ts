// swagger.config.ts

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Social Media App --Today--')
    .setDescription('In this app a user can upload their daily activities')
    .setVersion('1.0')
    .addTag('user')
    .build();
    

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
