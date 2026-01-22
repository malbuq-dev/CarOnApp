import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RESPONSES } from 'src/core/response/response.messages';
import { Ride } from 'src/domain/entities/ride.entity';
import { mapDomainErrorToHttp } from 'src/domain/errors/http-error.mapper';
import {
  RIDES_REPOSITORY,
  USERS_REPOSITORY,
} from 'src/domain/repositories/repository.tokens';
import type { RidesRepository } from 'src/domain/repositories/rides.repository';
import { Money } from 'src/domain/value-objects/money.value-object';

export interface UpdateRideRequest {
  rideId: string;
  userId: string;
  origin?: string;
  destination?: string;
  departureTime?: string;
  arrivalTime?: string;
  totalSeats?: number;
  price?: string;
}

export interface UpdateRideResponse {
  updatedRide: Ride;
}

@Injectable()
export class UpdateRideUseCase {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async execute(
    request: UpdateRideRequest,
  ): Promise<UpdateRideResponse> {
    const {
      rideId,
      userId,
      origin,
      destination,
      departureTime,
      arrivalTime,
      totalSeats,
      price,
    } = request;

    const ride = await this.ridesRepository.findByIdWithBookings(rideId);

    if (!ride) {
      throw new NotFoundException(RESPONSES.RIDES.NOT_FOUND);
    }

    if (ride.driverId !== userId) {
      throw new ForbiddenException(RESPONSES.RIDES.NOT_RIDE_OWNER);
    }

    try {
      const newPrice = price ? Money.fromDecimal(price) : undefined;
      ride.updatePrice(newPrice);

      ride.updateRoute(origin, destination);

      const newDepartureTime = departureTime ? new Date(departureTime) : undefined;
      const newArrivalTime = arrivalTime ? new Date(arrivalTime) : undefined;
      ride.updateSchedule(newDepartureTime, newArrivalTime);

      ride.updateSeats(totalSeats);

      await this.ridesRepository.save(ride);

      return { updatedRide: ride };
      
    } catch (error) {
      mapDomainErrorToHttp(error);
    }
  }
}

