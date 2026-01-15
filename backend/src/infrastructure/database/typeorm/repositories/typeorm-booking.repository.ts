import { BookingsRepository } from 'src/domain/repositories/bookings.repository';
import { TypeormBaseEntity } from '../entities/typeorm-base.entity';
import { Booking } from 'src/domain/entities/booking.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeormBookingEntity } from '../entities/typeorm-booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingMapper } from '../mappers/booking.mapper';
import { PaginationParams } from 'src/core/types/pagination-params.interface';
import { PaginatedResponse } from 'src/core/types/pagination-response.interface';

@Injectable()
export class TypeormBookingsRepository implements BookingsRepository {
  constructor(
    @InjectRepository(TypeormBookingEntity)
    private readonly repository: Repository<TypeormBookingEntity>,
  ) {}

  async findManyByPassengerId(
    passengerId: string,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Booking>> {
    const limit = pagination.limit ?? 50; // TO-DO: fazer isso vir do config
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const offset = (page - 1) * limit;

    const findOptions: any = {
      where: {
        passengerId,
      },
      take: limit,
      skip: offset,
    };

    if (pagination.sortBy && pagination.sortOrder) {
      findOptions.order = {
        [pagination.sortBy]: pagination.sortOrder.toUpperCase(),
      };
    }

    const [entities, totalItems] = await this.repository.findAndCount(findOptions);

    const items = entities.map(entity =>
      BookingMapper.toDomain(entity)
    );

    const totalPages = Math.ceil(totalItems / limit);

    const meta = {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    return { items, meta };
  }

  async findById(id: string): Promise<Booking | null> {
    const entity = await this.repository.findOne({
      where: { id }
    })

    if (!entity) {
      return null;
    }

    return BookingMapper.toDomain(entity);
  }

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
