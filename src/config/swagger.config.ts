import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('thesmsguru-backend')
  .setVersion('0.0.1')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .build()
