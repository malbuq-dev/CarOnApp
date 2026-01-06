import { PaginationFilterType } from "src/core/types/pagination-filter.type";
import { Ride } from "../entities/ride.entity";

export interface RidesRepository {
  findById(id: string): Promise<Ride | null>;
  save(ride: Ride): Promise<void>;
  findByIdAndAuthorId(id: string, authorId: string): Promise<Ride | null>;
  findManyByAuthor(query: PaginationFilterType, authorId: string): Promise<Ride[] | null>;
  deleteByIdAndAuthorId(id: string, authorId: string): Promise<void>;
}