import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../environment/environment.module';
import { EnvironmentConfigService } from '../environment/environment.service';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
({
  type: config.getDataBaseType(),
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  synchronize: config.getDatabaseSynchronize(),
  schema: config.getDatabaseSchema(),
  migrationsRun: config.getDatabaseSynchronize() === true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
} as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule { }
