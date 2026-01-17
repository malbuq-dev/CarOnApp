import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { BookingStatus } from 'src/domain/entities/booking.entity';
import { PaginationQueryDto } from 'src/core/dtos/pagination-query.dto';

export class FetchRideBookingsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filtrar reservas por passageiro',
    example: '9cabbee4-8c16-4626-b5f5-27d483305099',
  })
  @IsOptional()
  @IsUUID()
  passengerId?: string;

  @ApiPropertyOptional({
    description: 'Filtrar reservas pelo status',
    enum: BookingStatus,
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
