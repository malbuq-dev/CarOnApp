import { RefreshToken } from 'src/domain/entities/refresh-token.entity';
import { TypeormRefreshTokenEntity } from '../entities/typeorm-refresh-token.entity';
import { UserMapper } from './user.mapper';
import dayjs from 'src/core/config/dayjs.config';

export class RefreshTokenMapper {
  static toDomain(
    entity: TypeormRefreshTokenEntity,
  ): RefreshToken {
    const refreshToken = new RefreshToken(
      entity.token,
      UserMapper.toDomain(entity.user),
      entity.expiryDate,
    );

    refreshToken.id = entity.id;
    refreshToken.createdAt = dayjs(entity.createdAt).toDate();

    return refreshToken;
  }

  static toPersistence(
    refreshToken: RefreshToken,
  ): TypeormRefreshTokenEntity {
    const entity = new TypeormRefreshTokenEntity();

    entity.id = refreshToken.id;
    entity.token = refreshToken.token;
    entity.expiryDate = refreshToken.expiryDate;
    entity.user = UserMapper.toPersistence(refreshToken.user);

    return entity;
  }
}
