import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
    exposedHeaders: 'X-Token-Expired',
  })

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.enableVersioning({
    type: VersioningType.URI,
  })

  // Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('NestJS Smaples/Rest API - Swagger')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('api', app, document)

  const port = configService.get<number>('PORT')
  app.listen(port, () => console.info(`The server is running on ${port}`))
}
bootstrap()
