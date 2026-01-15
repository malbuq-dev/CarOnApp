import { Inject, Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/interfaces/pagination-params.interface';
import { PaginatedResponse } from 'src/core/interfaces/pagination-response.interface';
import { Booking } from 'src/domain/entities/booking.entity';
import type { BookingsRepository } from 'src/domain/repositories/bookings.repository';
import {
  BOOKINGS_REPOSITORY,
} from 'src/domain/repositories/repository.tokens';

export interface FetchBookingRequest {
  userId: string;
  pagination: PaginationParams;
}

@Injectable()
export class FetchUserBookingsUseCase {
  constructor(
    @Inject(BOOKINGS_REPOSITORY)
    private readonly bookingsRepository: BookingsRepository,
  ) {}

  async execute(request: FetchBookingRequest): Promise<PaginatedResponse<Booking>> {
    const { userId, pagination } = request;

    const paginatedResults = await this.bookingsRepository.findManyByPassengerId(userId, pagination);
    
    return paginatedResults;
  }
}
