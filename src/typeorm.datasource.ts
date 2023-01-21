import { env } from './shared/utils';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default new DataSource({
  type: 'postgres',
  host: env('DATABASE_HOST'),
  port: env('DATABASE_PORT', Number),
  username: env('DATABASE_USER'),
  password: env('DATABASE_PASSWORD'),
  database: env('DATABASE_DB'),
  synchronize: false,
  logger: 'debug',
  migrationsRun: env('RUN_MIGRATIONS_ON_START', (val) => val === '1'),
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ['dist/**/migrations/*.js'],
  entities: [`${__dirname}/**/entity/*.entity.{js,ts}`],
});
