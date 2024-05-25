import { UserEntity } from '../entity/user.entity';

export type UserResponseType = Omit<UserEntity, 'password'> & { token: string };
