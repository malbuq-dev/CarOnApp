import { Booking } from '../entities/booking.entity';

export interface BookingsRepository {
  save(booking: Booking): Promise<void>;
  findByIdAndAuthorId(id: string, authorId: string): Promise<Booking | null>;
  deleteByIdAndAuthorId(id: string, authorId: string): Promise<void>;
}
