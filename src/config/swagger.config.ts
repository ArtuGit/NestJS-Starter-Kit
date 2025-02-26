import { DocumentBuilder } from '@nestjs/swagger'
import * as packageJson from '../../package.json'

export const swaggerConfig = new DocumentBuilder()
  .setTitle(packageJson.name)
  .setVersion(packageJson.version)
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth', // This name must match the decorator parameter
  )
  .build()
