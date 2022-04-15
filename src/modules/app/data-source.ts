import path from 'path';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '040799',
  database: process.env.POSTGRES_DB || 'test',
  synchronize: true,
  entities: [path.join(__dirname, '..', '**/*.entity.{js,ts}')],
  subscribers: [],
  migrations: [],
});
