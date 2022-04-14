import { AppDataSource } from '../app/data-source';
import { UserEntity } from './users.entity';

export const UserRepository = AppDataSource.getRepository(UserEntity);
