import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDecimal,
  IsInt,
  IsString,
  Min,
} from 'class-validator';

export class CreateRideDto {

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
    description: 'Data e hora de saída no formato ISO 8601',
    example: '2026-01-10T08:00:00.000Z',
  })
  @IsDateString()
  departureTime: string;

  @ApiProperty({
    description: 'Data e hora estimada de chegada no formato ISO 8601',
    example: '2026-01-10T10:30:00.000Z',
  })
  @IsDateString()
  arrivalTime: string;

  @ApiProperty({
    description: 'Quantidade total de assentos disponíveis',
    example: 3,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  totalSeats: number;

  @ApiProperty({
    description: 'Preço da carona (até 2 casas decimais)',
    example: '35.50',
  })
  @IsDecimal({ decimal_digits: '0,2' })
  price: string;
}
