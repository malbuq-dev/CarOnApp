import { RefreshToken } from '../entities/refresh-token.entity';

export interface RefreshTokenRepository {
  save(refreshToken: RefreshToken): Promise<void>;
  findById(id: string): Promise<RefreshToken | null>;
  findByToken(token: string): Promise<RefreshToken | null>;
  findByUserId(userId: string): Promise<RefreshToken | null>;
  delete(id: string): Promise<void>;
}
