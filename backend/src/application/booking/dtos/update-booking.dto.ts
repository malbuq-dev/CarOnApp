import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingDto {
  @ApiProperty({
    description: 'Nova quantidade de assentos reservados',
    minimum: 1,
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  seatsBooked: number;
}
