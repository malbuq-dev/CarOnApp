import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RESPONSES } from 'src/core/response/response.messages';
import { Booking } from 'src/domain/entities/booking.entity';
import { mapDomainErrorToHttp } from 'src/domain/errors/http-error.mapper';
import type { BookingsRepository } from 'src/domain/repositories/bookings.repository';
import {
  BOOKINGS_REPOSITORY,
  RIDES_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/domain/repositories/repository.tokens';
import type { RidesRepository } from 'src/domain/repositories/rides.repository';
import type { UsersRepository } from 'src/domain/repositories/users.repository';

export interface CreateBookingRequest {
  passengerId: string;
  rideId: string;
  seatsBooked: number;
}

export interface CreateBookingResponse {
  booking: Booking;
}

@Injectable()
export class CreateBookingUseCase {
  constructor(
    @Inject(BOOKINGS_REPOSITORY)
    private readonly bookingsRepository: BookingsRepository,
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(request: CreateBookingRequest) {
    const ride = await this.ridesRepository.findByIdWithBookings(request.rideId);
    const passenger = await this.usersRepository.findById(request.passengerId);

    if (!passenger) throw new NotFoundException(RESPONSES.BOOKINGS.PASSENGER_NOT_FOUND);

    if (!ride) throw new NotFoundException(RESPONSES.RIDES.NOT_FOUND);

    const now = new Date();

    let booking: Booking;

    try {
      booking = ride.requestBooking(
        request.passengerId,
        request.seatsBooked,
        now,
      );
    } catch (error) {
      mapDomainErrorToHttp(error);
    }

    await this.bookingsRepository.save(booking);

    return { booking };
  }
}

