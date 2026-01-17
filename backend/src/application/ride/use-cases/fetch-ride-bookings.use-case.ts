import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationParams } from 'src/core/interfaces/pagination-params.interface';
import { PaginatedResponse } from 'src/core/interfaces/pagination-response.interface';
import { RESPONSES } from 'src/core/response/response.messages';
import { Booking, BookingStatus } from 'src/domain/entities/booking.entity';
import { Ride } from 'src/domain/entities/ride.entity';
import type { BookingsRepository } from 'src/domain/repositories/bookings.repository';
import { BOOKINGS_REPOSITORY, RIDES_REPOSITORY } from 'src/domain/repositories/repository.tokens';
import type { RidesRepository } from 'src/domain/repositories/rides.repository';

export interface FetchRideBookingsRequest {
  userId: string,
  rideId: string;
  passengerId?: string;
  status?: BookingStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable()
export class FetchRideBookingsUseCase {
  constructor(
    @Inject(BOOKINGS_REPOSITORY)
    private readonly bookingsRepository: BookingsRepository,
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async execute(request: FetchRideBookingsRequest): Promise<PaginatedResponse<Booking>> {
    const { 
      userId,
      rideId,
      passengerId,
      status,
      page,
      limit,
      sortBy,
      sortOrder
    } = request;

    const ride = await this.ridesRepository.findByIdAndAuthorId(rideId, userId);

    if (!ride) {
        throw new NotFoundException(RESPONSES.RIDES.NOT_FOUND);
    }

    const query = {
      status,
      passengerId,
      page,
      limit,
      sortBy,
      sortOrder
    }

    const paginatedResult = await this.bookingsRepository.findManyByRideId(rideId, query);

    return paginatedResult;
  }
}
