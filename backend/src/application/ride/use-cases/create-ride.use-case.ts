import {
  BadRequestException,
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
import type { UsersRepository } from 'src/domain/repositories/users.repository';
import { Money } from 'src/domain/value-objects/money.value-object';

export interface CreateRideRequest {
  driverId: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  totalSeats: number;
  priceString: string;
}

export interface CreateRideResponse {
  ride: Ride;
}

@Injectable()
export class CreateRideUseCase {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    createRideRequest: CreateRideRequest,
  ): Promise<CreateRideResponse> {
    const {
      driverId,
      origin,
      destination,
      departureTime,
      arrivalTime,
      totalSeats,
      priceString,
    } = createRideRequest;

    const driver = await this.usersRepository.findById(driverId);

    if (!driver) {
      throw new NotFoundException(RESPONSES.RIDES.DRIVER_NOT_FOUND);
    }

    const price = Money.fromDecimal(priceString);
    
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);


    try {
      const ride = Ride.create(
        driverId,
        origin,
        destination,
        departureDate,  
        arrivalDate,
        totalSeats,
        price,
      );
      await this.ridesRepository.save(ride);

      return { ride };

    } catch (error) {
        mapDomainErrorToHttp(error);
    }

  }
}
