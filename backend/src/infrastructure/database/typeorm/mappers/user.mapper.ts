import { User } from 'src/domain/entities/user.entity';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';
import dayjs from 'src/core/config/dayjs.config';

export class UserMapper {
  static toDomain(entity: TypeormUserEntity): User {
    const user = new User(
      entity.firstName,
      entity.lastName,
      entity.email,
      entity.password,
    );
    user.id = entity.id;
    user.createdAt = dayjs(entity.createdAt).toDate();
    user.updatedAt = dayjs(entity.updatedAt).toDate();
    return user;
  }

  static toPersistence(user: User): TypeormUserEntity {
    const entity = new TypeormUserEntity();
    entity.id = user.id;
    entity.firstName = user.firstName;
    entity.lastName = user.lastName;
    entity.email = user.email;
    entity.password = user.password;
    return entity;
  }
}
