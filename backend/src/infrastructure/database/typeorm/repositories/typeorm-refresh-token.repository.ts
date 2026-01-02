import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TypeormRefreshTokenEntity } from '../entities/typeorm-refresh-token.entity';
import { RefreshTokenMapper } from '../mappers/refresh-token.mapper';
import { RefreshToken } from 'src/domain/entities/refresh-token.entity';
import { RefreshTokenRepository } from 'src/domain/repositories/refresh-token.repository';

@Injectable()
export class TypeormRefreshTokenRepository implements RefreshTokenRepository {
  constructor(
    @InjectRepository(TypeormRefreshTokenEntity)
    private readonly repository: Repository<TypeormRefreshTokenEntity>,
  ) {}

  async save(refreshToken: RefreshToken): Promise<void> {
    const entity = RefreshTokenMapper.toPersistence(refreshToken);
    await this.repository.save(entity);
  }

  async findById(id: string): Promise<RefreshToken | null> {
    const result = await this.repository.findOne({
      where: { id },
    });
    return result ? RefreshTokenMapper.toDomain(result) : null;
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const result = await this.repository.findOne({
      where: { token: token },
    });
    return result ? RefreshTokenMapper.toDomain(result) : null;
  }

  async findByUserId(userId: string): Promise<RefreshToken | null> {
    const result = await this.repository.findOne({
      where: { 
        user: {
            id: userId,
      },
    },
    relations: ['user']
    });
    return result ? RefreshTokenMapper.toDomain(result) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

}
