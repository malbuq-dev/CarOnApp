import { BookingsRepository } from 'src/domain/repositories/bookings.repository';
import { TypeormBaseEntity } from '../entities/typeorm-base.entity';
import { Booking } from 'src/domain/entities/booking.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeormBookingEntity } from '../entities/typeorm-booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingMapper } from '../mappers/booking.mapper';

@Injectable()
export class TypeormBookingsRepository implements BookingsRepository {
  constructor(
    @InjectRepository(TypeormBookingEntity)
    private readonly repository: Repository<TypeormBookingEntity>,
  ) {}

  async save(booking: Booking): Promise<void> {
    const entity = BookingMapper.toPersistence(booking);
    await this.repository.save(entity);
  }

  async findByIdAndAuthorId(
    id: string,
    authorId: string,
  ): Promise<Booking | null> {
    const entity = await this.repository.findOne({
      where: {
        id,
        passenger: { id: authorId },
      },
      relations: ['passenger'],
    });

    if (!entity) {
      return null;
    }

    return BookingMapper.toDomain(entity);
  }

  async deleteByIdAndAuthorId(id: string, authorId: string): Promise<void> {
    await this.repository.delete({
      id: id,
      passenger: { id: authorId },
    });
  }
}
