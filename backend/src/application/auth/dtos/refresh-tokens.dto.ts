import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokensDto {
  @ApiProperty({
      description: 'Refresh token para dar sobrevida ao token de autenticação',
  })
  @IsString()
  refreshToken: string;
}