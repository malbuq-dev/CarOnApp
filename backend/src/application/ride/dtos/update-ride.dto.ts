import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateRideDto {
  @ApiPropertyOptional({
    description: 'Novo local de origem da carona',
    example: 'Garanhuns - PE',
  })
  @IsString()
  @IsOptional()
  origin?: string;

  @ApiPropertyOptional({
    description: 'Novo local de destino da carona',
    example: 'Recife - PE',
  })
  @IsString()
  @IsOptional()
  destination?: string;

  @ApiPropertyOptional({
    description: 'Novo horário de saída da carona (ISO 8601)',
    example: '2026-01-10T08:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  departureTime?: string;

  @ApiPropertyOptional({
    description: 'Novo horário estimado de chegada (ISO 8601)',
    example: '2026-01-10T12:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  arrivalTime?: string;

  @ApiPropertyOptional({
    description: 'Nova quantidade total de assentos disponíveis',
    example: 4,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  totalSeats?: number;

  @ApiPropertyOptional({
    description: 'Novo preço da carona',
    example: '35.50',
  })
  @IsDecimal({ decimal_digits: '0,2' })
  @IsOptional()
  price?: string;
}
