import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { config } from 'dotenv'
import { Logger } from '@nestjs/common'

import { AppModule } from './app.module'
import { envConfig, runMigrations, swaggerConfig, validateDotEnvConfig } from './config'

const logger = new Logger('NestApplication')

config()

async function bootstrap() {
  await validateDotEnvConfig()

  await runMigrations()

  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  })

  app.enableCors()
  app.enableShutdownHooks()
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true, does not work with query params
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  if (envConfig.NODE_ENV !== 'production') {
    SwaggerModule.setup('doc', app, SwaggerModule.createDocument(app, swaggerConfig))
  }
  await app.listen(envConfig.PORT, '0.0.0.0')
  logger.verbose(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
