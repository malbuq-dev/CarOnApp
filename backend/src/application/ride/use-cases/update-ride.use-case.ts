import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Ride } from "src/domain/entities/ride.entity";
import { RIDES_REPOSITORY, USERS_REPOSITORY } from "src/domain/repositories/repository.tokens";
import type { RidesRepository } from "src/domain/repositories/ride.repository";
import { Money } from "src/domain/value-objects/money.value-object";

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
    updatedRide: Ride
}

@Injectable()
export class UpdateRideUseCase {
    constructor(
        @Inject(RIDES_REPOSITORY)
        private readonly ridesRepository: RidesRepository,
    ) {}

    async execute(request: UpdateRideRequest) {
        const ride = await this.ridesRepository.findByIdAndAuthorId(
            request.rideId,
            request.userId
        );

        if (!ride) {
            throw new NotFoundException();
        }

        ride.update({
            origin: request.origin,
            destination: request.destination,
            departureTime: new Date(request.departureTime),
            arrivalTime: new Date(request.arrivalTime),
            totalSeats: request.totalSeats,
            price: Money.fromDecimal(request.price),
        });

        await this.ridesRepository.save(ride);

        return { ride };
    }


}