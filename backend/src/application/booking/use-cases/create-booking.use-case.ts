import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RESPONSES } from 'src/core/response/response.messages';
import { Booking } from 'src/domain/entities/booking.entity';
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

  async execute(request: CreateBookingRequest): Promise<CreateBookingResponse> {
    const { passengerId, rideId, seatsBooked } = request;

    const ride = await this.ridesRepository.findByIdWithBookings(rideId);
    const passenger = await this.usersRepository.findById(passengerId);

    if (!passenger) {
      throw new NotFoundException(RESPONSES.BOOKINGS.PASSENGER_NOT_FOUND);
    }

    if (!ride) {
      throw new NotFoundException(RESPONSES.RIDES.NOT_FOUND);
    }
    
    if (ride.driverId === passengerId) {
      throw new BadRequestException(RESPONSES.BOOKINGS.DRIVER_CANT_BOOK_OWN_RIDE);
    }

    const now = new Date; // TO-DO: esses casos aqui deveriam estar dentro do domínio, tenho que ver os erros responses no dominio

    if (now >= ride.departureTime) {
      throw new BadRequestException(RESPONSES.BOOKINGS.CANNOT_BOOK_AFTER_RIDE_DEPARTURE);
    }

    if (!ride.hasEnoughSeats(seatsBooked)) {
      throw new NotFoundException(RESPONSES.BOOKINGS.NO_AVALIABLE_SEATS);
    }

    const booking = new Booking(seatsBooked, rideId, passengerId);

    await this.bookingsRepository.save(booking);

    return { booking };
  }
}
