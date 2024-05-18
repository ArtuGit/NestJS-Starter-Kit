import { DocumentBuilder } from '@nestjs/swagger'
import * as packageJson from '../../package.json'

export const swaggerConfig = new DocumentBuilder()
  .setTitle(packageJson.name)
  .setVersion(packageJson.version)
  .addBearerAuth()
  .build()
