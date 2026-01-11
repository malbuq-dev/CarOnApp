import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { RefreshTokenRepository } from 'src/domain/repositories/refresh-token.repository';
import { REFRESH_TOKEN_REPOSITORY } from 'src/domain/repositories/repository.tokens';
import { TokenService } from '../services/tokens.service';
import { Tokens } from 'src/domain/entities/tokens.entity';
import { RESPONSES } from 'src/core/response/response.messages';

export interface RefreshTokensRequest {
  refreshToken: string;
}

export interface RefreshTokensResponse {
  tokens: Tokens;
}

@Injectable()
export class RefreshTokensUseCase {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(
    refreshTokenRequest: RefreshTokensRequest,
  ): Promise<RefreshTokensResponse> {
    const token = await this.refreshTokenRepository.findByToken(
      refreshTokenRequest.refreshToken,
    );

    if (!token) {
      throw new UnauthorizedException(RESPONSES.AUTH.INVALID_REFRESH_TOKEN);
    }

    return {
      tokens: await this.tokenService.generateTokensForUser(token.user),
    };
  }
}
