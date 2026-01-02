import { Injectable, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RefreshToken } from "src/domain/entities/refresh-token.entity";
import { User } from "src/domain/entities/user.entity";
import { v4 as uuidv4 } from 'uuid';
import type { RefreshTokenRepository } from "src/domain/repositories/refresh-token.repository";
import { REFRESH_TOKEN_REPOSITORY } from "src/domain/repositories/repository.tokens";
import { Tokens } from "src/domain/entities/tokens";

@Injectable()
export class TokenService {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokensForUser(user: User): Promise<Tokens> {
    const accessToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '10h' },
    );

    const refreshTokenValue = uuidv4();

    await this.rotateRefreshToken(user, refreshTokenValue);
    
    const tokens = new Tokens(accessToken, refreshTokenValue);
    
    return tokens;
  }

  private async rotateRefreshToken(
    user: User,
    refreshTokenValue: string,
  ): Promise<void> {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    const existingToken =
      await this.refreshTokenRepository.findByUserId(user.id);

    if (existingToken) {
      existingToken.rotate(refreshTokenValue, expiryDate);
      await this.refreshTokenRepository.save(existingToken);
      return;
    }

    const refreshToken = new RefreshToken(
      refreshTokenValue,
      user,
      expiryDate,
    );

    await this.refreshTokenRepository.save(refreshToken);
  }
}
