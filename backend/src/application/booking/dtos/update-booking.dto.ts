import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class UpdateBookingDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  seatsBooked: number;
}
