import { Injectable } from '@nestjs/common';
import { Ride } from 'src/domain/entities/ride.entity';
import { RidesRepository } from 'src/domain/repositories/rides.repository';
import { ILike, MoreThanOrEqual, Repository } from 'typeorm';
import { TypeormRideEntity } from '../entities/typeorm-ride.entity';
import { RideMapper } from '../mappers/ride.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationParams } from 'src/core/interfaces/pagination-params.interface';
import { PaginatedResponse } from 'src/core/interfaces/pagination-response.interface';

@Injectable()
export class TypeormRideRepository implements RidesRepository {
  constructor(
    @InjectRepository(TypeormRideEntity)
    private readonly repository: Repository<TypeormRideEntity>,
  ) {}

  async searchRides(filter: {
    origin?: string;
    destination?: string;
    date?: string;
    seats?: number;
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<Ride[]> {
    const {
      origin,
      destination,
      date,
      seats,
      limit = 50, // TO-DO: fazer isso aqui sair do config file
      offset = 0,
      sortBy = 'departureTime',
      sortOrder = 'asc',
    } = filter;

    const where: any = {};

    if (origin) where.origin = ILike(`%${origin}%`);
    if (destination) where.destination = ILike(`%${destination}%`);
    if (seats) where.totalSeats = MoreThanOrEqual(seats);
    if (date) where.departureTime = MoreThanOrEqual(new Date(date));

    const rides = await this.repository.find({
      relations: ['driver'],
      where,
      take: limit,
      skip: offset,
      order: {
        [sortBy]: sortOrder.toUpperCase(),
      },
    });

    return rides.map(RideMapper.toDomain);
  }

  async findManyByAuthor(
    pagination: PaginationParams,
    authorId: string,
  ): Promise<PaginatedResponse<Ride>> {
    const limit = pagination.limit ?? 50; // TO-DO: fazer isso aqui sair do config file
    const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
    const offset = (page - 1) * limit;

    const findOptions: any = {
      relations: ['driver'],
      driver: { id: authorId },
      take: limit,
      skip: offset,
    };

    if (pagination.sortBy && pagination.sortOrder) {
      findOptions.order = {
        [pagination.sortBy]: pagination.sortOrder.toUpperCase(),
      };
    }

    const [ entities, totalItems ] = await this.repository.findAndCount(findOptions);

    const items = entities.map(entity =>
      RideMapper.toDomain(entity)
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

  async findById(id: string): Promise<Ride | null> {
    const ride = await this.repository.findOne({
      where: { id },
      relations: ['driver'],
    });

    if (!ride) {
      return null;
    }

    return RideMapper.toDomain(ride);
  }

  async findByIdWithBookings(id: string): Promise<Ride | null> {
    const ride = await this.repository.findOne({
      where: { id },
      relations: ['driver', 'bookings'],
    });

    if (!ride) {
      return null;
    }

    return RideMapper.toDomain(ride);
  }

  async findByIdAndAuthorId(
    id: string,
    authorId: string,
  ): Promise<Ride | null> {
    const entity = await this.repository.findOne({
      where: {
        id,
        driver: { id: authorId },
      },
      relations: ['driver'],
    });

    if (!entity) {
      return null;
    }

    return RideMapper.toDomain(entity);
  }

  async deleteByIdAndAuthorId(id: string, authorId: string): Promise<void> {
    await this.repository.delete({
      id,
      driver: { id: authorId },
    });
  }

  async save(ride: Ride): Promise<void> {
    const entity = RideMapper.toPersistence(ride);
    await this.repository.save(entity);
  }
}
