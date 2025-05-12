import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DomainExceptionHandler } from './infraestructure/api/exceptionHandlers'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*',
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false, value: false },
    }),
  )
  app.useGlobalFilters(new DomainExceptionHandler())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
