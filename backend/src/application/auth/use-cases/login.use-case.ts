import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import { REFRESH_TOKEN_REPOSITORY, USERS_REPOSITORY } from "src/domain/repositories/repository.tokens";
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import type { UsersRepository } from "src/domain/repositories/users.repository";
import type { RefreshTokenRepository } from "src/domain/repositories/refresh-token.repository";
import { RefreshToken } from "src/domain/entities/refresh-token.entity";
import type { PasswordHasher } from "src/domain/security/password-hasher";
import { PASSWORD_HASHER } from "src/domain/security/security.tokens";
import { TokenService } from "../services/tokens.service";
import { Tokens } from "src/domain/entities/tokens.entity";
import { RESPONSES } from "src/core/response/response.messages";

export interface LoginUseCaseRequest {
    email: string;
    password: string;
}

export interface LoginUseCaseResponse {
    user: User
    tokens: Tokens
}

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
  ) {}

  async execute(
    request: LoginUseCaseRequest,
  ): Promise<LoginUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(request.email);

    if (!user) {
      throw new UnauthorizedException(RESPONSES.AUTH.INVALID_CREDENTIALS);
    }
    
    const passwordMatch = await this.passwordHasher.compare(
      request.password,
      user.password,
    );
    
    if (!passwordMatch) {
      throw new UnauthorizedException(RESPONSES.AUTH.INVALID_CREDENTIALS);
    }

    const tokens = await this.tokenService.generateTokensForUser(user);

    return { user, tokens };
  }
}
