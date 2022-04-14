import path from 'path';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '040799',
  database: process.env.DB_NAME || 'test',
  synchronize: true,
  entities: [path.join(__dirname, '..', '**/*.entity.{js,ts}')],
  subscribers: [],
  migrations: [],
});
