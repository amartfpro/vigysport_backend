import {
  IsNumber,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

class EnvironmentVariables {
  @IsString()
  SERVICE_NAME: string;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_PORT: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  JWT_SECRET: string;
}

export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig);
  if (errors.length > 0) {
    const errorMessages = errors
      .map((error: ValidationError) => {
        return Object.values(error.constraints || {}).join(', ');
      })
      .join('; ');

    throw new Error(`ERROR: Configuración inválida: ${errorMessages}`);
  }

  return validatedConfig;
}
