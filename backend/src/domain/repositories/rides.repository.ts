import { PaginationParams } from 'src/core/types/pagination-params.interface';
import { Ride } from '../entities/ride.entity';
import { PaginatedResponse } from 'src/core/types/pagination-response.interface';

export interface RidesRepository {
  findById(id: string): Promise<Ride | null>;
  save(ride: Ride): Promise<void>;
  findByIdAndAuthorId(id: string, authorId: string): Promise<Ride | null>;
  findManyByAuthor(
    pagination: PaginationParams,
    authorId: string,
  ): Promise<PaginatedResponse<Ride>>;
  deleteByIdAndAuthorId(id: string, authorId: string): Promise<void>;
  searchRides(searchFilter: {
    origin: string;
    destination: string;
    date: string;
    seats: number;
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<Ride[]>;
  findByIdWithBookings(id: string): Promise<Ride | null>;
}
