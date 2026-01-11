import { PaginationFilterType } from 'src/core/types/pagination-filter.type';
import { Ride } from '../entities/ride.entity';

export interface RidesRepository {
  findById(id: string): Promise<Ride | null>;
  save(ride: Ride): Promise<void>;
  findByIdAndAuthorId(id: string, authorId: string): Promise<Ride | null>;
  findManyByAuthor(
    query: PaginationFilterType,
    authorId: string,
  ): Promise<Ride[]>;
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
