import { Module } from '@nestjs/common';
import { REFRESH_TOKEN_REPOSITORY, USERS_REPOSITORY } from 'src/domain/repositories/repository.tokens';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormRefreshTokenRepository } from './typeorm/repositories/typeorm-refresh-token.repository';
import { TypeormUserRepository } from './typeorm/repositories/typeorm-user.repository';
import { TypeormUserEntity } from './typeorm/entities/typeorm-user.entity';
import { TypeormRefreshTokenEntity } from './typeorm/entities/typeorm-refresh-token.entity';

const REPOSITORIES = [
    {
        provide: USERS_REPOSITORY,
        useClass: TypeormUserRepository,
    },
    {
        provide: REFRESH_TOKEN_REPOSITORY,
        useClass: TypeormRefreshTokenRepository,
    },
]

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeormUserEntity,
      TypeormRefreshTokenEntity,
    ]),
  ],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class TypeormPersistenceModule {}