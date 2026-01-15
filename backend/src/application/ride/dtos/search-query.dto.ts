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
import { PaginationQueryDto } from 'src/core/dtos/pagination-query.dto';

export class SearchRidesQueryDto extends PaginationQueryDto {
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
}
