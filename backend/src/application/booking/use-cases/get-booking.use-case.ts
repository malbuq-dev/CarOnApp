import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RESPONSES } from 'src/core/response/response.messages';
import { Booking } from 'src/domain/entities/booking.entity';
import type { BookingsRepository } from 'src/domain/repositories/bookings.repository';
import {
  BOOKINGS_REPOSITORY,
  RIDES_REPOSITORY,
} from 'src/domain/repositories/repository.tokens';
import type { RidesRepository } from 'src/domain/repositories/rides.repository';

export interface GetBookingRequest {
  bookingId: string;
  userId: string;
}

export interface GetBookingResponse {
  booking: Booking;
}

@Injectable()
export class GetBookingUseCase {
  constructor(
    @Inject(BOOKINGS_REPOSITORY)
    private readonly bookingsRepository: BookingsRepository,
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async execute(request: GetBookingRequest): Promise<GetBookingResponse> {
    const { bookingId, userId} = request;

    const booking = await this.bookingsRepository.findById(bookingId);
    
    if (!booking) {
      throw new NotFoundException(RESPONSES.BOOKINGS.NOT_FOUND);
    }

    const ride = await this.ridesRepository.findById(booking.rideId);

    if (!ride) {
      throw new NotFoundException(RESPONSES.RIDES.NOT_FOUND);
    }
    
    if (
      booking.passengerId != userId &&
      ride.driverId != userId
    ) {
      throw new BadRequestException(RESPONSES.BOOKINGS.ONLY_BOOKING_OWNER_OR_RIDE_OWNER_ALLOWED)
    }

    return { booking };
  }
}
