import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) { }

  getDataBaseType(): string {
    return this.configService.get<string>('DATABASE_TYPE');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USERNAME');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabaseSynchronize(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }


  /**
   * Get the port where the app will be running
   * 
   * @returns The port where the app will be running
   */
  getAppPort(): number {
    return this.configService.get<number>('APP_PORT');
  }
}
