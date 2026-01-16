import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RESPONSES } from 'src/core/response/response.messages';
import { Booking } from 'src/domain/entities/booking.entity';
import type { BookingsRepository } from 'src/domain/repositories/bookings.repository';
import {
  BOOKINGS_REPOSITORY,
} from 'src/domain/repositories/repository.tokens';

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
    @Inject(BOOKINGS_REPOSITORY)
    private readonly bookingsRepository: BookingsRepository,
  ) {}

  async execute(request: UpdateBookingRequest): Promise<UpdateBookingResponse> {
    const { bookingId, userId, seatsBooked } = request;

    const booking = await this.bookingsRepository.findByIdAndAuthorId(bookingId, userId);
    
    if (!booking) {
        throw new NotFoundException(RESPONSES.BOOKINGS.NOT_FOUND);
    }

    if (booking.isCanceled()) {
        throw new BadRequestException(RESPONSES.BOOKINGS.CANNOT_UPDATE_AFTER_CANCELING);
    }

    if (booking.isApproved()) {
        throw new BadRequestException(RESPONSES.BOOKINGS.CANNOT_BE_UPDATED_AFTER_APPROVAL);
    }
    
    booking.seatsBooked = seatsBooked;

    await this.bookingsRepository.save(booking);

    return { booking };
  }
}
