import { PaginationParams } from 'src/core/interfaces/pagination-params.interface';
import { Booking, BookingStatus } from '../entities/booking.entity';
import { PaginatedResponse } from 'src/core/interfaces/pagination-response.interface';

export interface FetchRideBookingsQuery {
  status?: BookingStatus;
  passengerId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
export interface BookingsRepository {
  save(booking: Booking): Promise<void>;
  findByIdAndAuthorId(
    id: string,
    authorId: string): Promise<Booking | null>;
  findManyByPassengerId(
    passengerId: string,
    pagination: PaginationParams,
  ): Promise<PaginatedResponse<Booking>>;
  findById(id: string): Promise<Booking | null>;
  deleteByIdAndAuthorId(
    id: string,
    authorId: string): Promise<void>;
  findManyByRideId(
    rideId: string,
    query: FetchRideBookingsQuery,
  ): Promise<PaginatedResponse<Booking>>;
}
