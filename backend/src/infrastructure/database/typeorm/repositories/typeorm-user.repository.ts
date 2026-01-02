import type { UsersRepository } from 'src/domain/repositories/users.repository';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { User } from 'src/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class TypeormUserRepository implements UsersRepository {
  constructor(
    @InjectRepository(TypeormUserEntity)
    private readonly repository: Repository<TypeormUserEntity>,
  ) {}

  async save(user: User): Promise<void> {
    const entity = UserMapper.toPersistence(user);
    await this.repository.save(entity);
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.repository.findOne({
      where: { id },
    });
    return result ? UserMapper.toDomain(result) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.repository.findOne({
      where: { email },
    });
    return result ? UserMapper.toDomain(result) : null;
  }
}
