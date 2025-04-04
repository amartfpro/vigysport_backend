import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { validateConfig } from './config.validation';
import { AuthMiddleware } from './middleware/auth.middleware';
import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  try {
    const result = dotenv.config();

    if (result.error) {
      throw new Error(`
        Error cargando el archivo .env: ${result.error.message}`);
    }

    validateConfig(process.env);

    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.use(helmet());

    const authMiddleware = new AuthMiddleware();
    app.use((req: Request, res: Response, next: NextFunction) =>
      authMiddleware.use(req, res, next),
    );

    const port = process.env.PORT ? Number(process.env.PORT) : 3001;

    app.enableCors({
      origin: ['http://localhost:3000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
    });

    // Hacer require de sequelize config

    await app.listen(port);
    console.log(`Api-Gateway microservice is running on port ${port}`);
  } catch (error) {
    console.error('Error en la inicialización del Api-Gateway: ', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('Error starting Api-Gateway: ', error);
  process.exit(1);
});
