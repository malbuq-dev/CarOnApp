import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RESPONSES } from 'src/core/response/response.messages';
import { Booking } from 'src/domain/entities/booking.entity';
import { mapDomainErrorToHttp } from 'src/domain/errors/http-error.mapper';
import type { BookingsRepository } from 'src/domain/repositories/bookings.repository';
import {
  BOOKINGS_REPOSITORY,
  RIDES_REPOSITORY,
} from 'src/domain/repositories/repository.tokens';
import type { RidesRepository } from 'src/domain/repositories/rides.repository';

export interface UpdateBookingRequest {
  bookingId: string;
  userId: string;
  seatsBooked: number;
}

export interface UpdateBookingResponse {
  booking: Booking;
}

@Injectable()
export class UpdateBookingUseCase {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async execute(request: UpdateBookingRequest): Promise<UpdateBookingResponse> {
    const { bookingId, userId, seatsBooked } = request;

    const ride = await this.ridesRepository.findByBookingIdWithBookings(bookingId);
    
    if (!ride) {
        throw new NotFoundException(RESPONSES.BOOKINGS.NOT_FOUND);
    }

    try {
      console.log(ride);
      const booking = ride.updateBooking(
        bookingId,
        userId,
        {newSeatsBooked: seatsBooked});
      
      await this.ridesRepository.save(ride);

      return { booking };
    }
    catch(error) {
      mapDomainErrorToHttp(error);
    }

  }
}
