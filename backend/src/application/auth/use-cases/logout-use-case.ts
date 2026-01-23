import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import {
  REFRESH_TOKEN_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/domain/repositories/repository.tokens';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import type { UsersRepository } from 'src/domain/repositories/users.repository';
import type { RefreshTokenRepository } from 'src/domain/repositories/refresh-token.repository';
import { RefreshToken } from 'src/domain/entities/refresh-token.entity';
import type { PasswordHasher } from 'src/domain/security/password-hasher';
import { PASSWORD_HASHER } from 'src/domain/security/security.tokens';
import { TokenService } from '../services/tokens.service';
import { Tokens } from 'src/domain/entities/tokens.entity';
import { RESPONSES } from 'src/core/response/response.messages';

export interface LogoutUseCaseRequest {
  userId: string;
}

@Injectable()
export class LogoutUseCase {
  constructor(
    private readonly tokenService: TokenService,
  ) {}

  async execute(request: LogoutUseCaseRequest): Promise<void> {
    const { userId } = request;

    await this.tokenService.revokeToken(userId);
  }
}
