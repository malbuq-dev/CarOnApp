import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsDateString,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SearchRidesQueryDto {
  @ApiProperty({
    description: 'Local de origem da carona',
    example: 'Garanhuns - PE',
  })
  @IsString()
  origin: string;

  @ApiProperty({
    description: 'Local de destino da carona',
    example: 'Recife - PE',
  })
  @IsString()
  destination: string;

  @ApiProperty({
    description: 'Data da carona (formato ISO 8601)',
    example: '2026-01-10',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Quantidade mínima de assentos necessários',
    example: 2,
    minimum: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  seats: number;

  @ApiPropertyOptional({
    description: 'Quantidade máxima de resultados retornados',
    example: 10,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Offset para paginação',
    example: 0,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({
    description: 'Campo utilizado para ordenação',
    example: 'departureTime',
    enum: ['departureTime', 'price', 'createdAt'],
  })
  @IsOptional()
  @IsIn(['departureTime', 'price', 'createdAt'])
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Ordem da ordenação',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
