import { PaginationParams } from 'src/core/types/pagination-params.interface';
import { Booking } from '../entities/booking.entity';
import { PaginatedResponse } from 'src/core/types/pagination-response.interface';

export interface BookingsRepository {
  save(booking: Booking): Promise<void>;
  findByIdAndAuthorId(id: string, authorId: string): Promise<Booking | null>;
  findManyByPassengerId(
    passengerId: string,
    pagination: PaginationParams,
  ): Promise<PaginatedResponse<Booking>>;
  findById(id: string): Promise<Booking | null>;
  deleteByIdAndAuthorId(id: string, authorId: string): Promise<void>;
}
