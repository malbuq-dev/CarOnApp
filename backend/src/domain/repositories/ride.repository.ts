import { Ride } from "../entities/ride.entity";

export interface RidesRepository {
  save(ride: Ride): Promise<void>;
  findByIdAndAuthorId(id: string, authorId: string): Promise<Ride | null>
  deleteByIdAndAuthorId(id: string, authorId: string): Promise<void>
}