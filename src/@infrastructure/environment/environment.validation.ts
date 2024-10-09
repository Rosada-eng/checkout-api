import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {

  @IsString()
  DATABASE_TYPE: string;
  @IsString()
  DATABASE_HOST: string;
  @IsNumber()
  DATABASE_PORT: number;
  @IsString()
  DATABASE_USERNAME: string;
  @IsString()
  DATABASE_PASSWORD: string;
  @IsString()
  DATABASE_NAME: string;
  @IsString()
  DATABASE_SCHEMA: string;
  @IsBoolean()
  DATABASE_SYNCHRONIZE: boolean;

  @IsNumber()
  APP_PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
