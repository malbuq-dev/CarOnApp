import { Type } from 'class-transformer';
import { IsInt, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'ID da carona que será reservada',
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsUUID()
  rideId: string;

  @ApiProperty({
    description: 'Quantidade de assentos reservados',
    minimum: 1,
    example: 2,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  seatsBooked: number;
}
