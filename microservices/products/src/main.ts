import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { validateConfig } from './config.validation';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const result = dotenv.config();

    if (result.error) {
      throw new Error(`
        Error cargando el archivo .env: ${result.error.message}`);
    }

    validateConfig(process.env);

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    const port = process.env.PORT ? Number(process.env.PORT) : 3003;

    app.enableCors({
      origin: ['http://localhost:3000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
    });

    await app.listen(port);
    console.log(`Products microservice is running on port ${port}`);
  } catch (error) {
    console.error(
      'Error en la inicialización del microservicio Products:',
      error,
    );
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('Error starting Products microservice:', error);
  process.exit(1);
});
