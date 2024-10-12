import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: '.env' });
}

const config: DataSourceOptions & SeederOptions = {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  schema: process.env.DATABASE_SCHEMA,
  migrationsRun: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  extra: {
    ssl: process.env.DATABASE_SSL_ENABLED === 'true' ? {
      rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
      ca: process.env.DATABASE_CA ?? undefined,
      key: process.env.DATABASE_KEY ?? undefined,
      cert: process.env.DATABASE_CERT ?? undefined,
    } : undefined,
  },

  seeds: ['dist/@infrastructure/seeds/**/*.js'],
};

export default config;
