import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
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

    async execute(updateRideRequest: UpdateRideRequest) {
        const {
            rideId,
            userId,
            origin,
            destination,
            departureTime,
            arrivalTime,
            totalSeats,
            price
        } = updateRideRequest;

        const existingRide = await this.ridesRepository.findByIdAndAuthorId(
            rideId,
            userId
        );

        if (!existingRide) {
            throw new NotFoundException('A carona não foi encontrada');
        }

        if (origin) existingRide.origin = origin;
        if (destination) existingRide.destination = destination;
        if (departureTime) existingRide.departureTime = new Date(departureTime);
        if (arrivalTime) existingRide.arrivalTime = new Date(arrivalTime);
        if (totalSeats) existingRide.totalSeats = totalSeats;
        if (price) existingRide.price = Money.fromDecimal(price);

        if (existingRide.arrivalTime <= existingRide.departureTime) {
            throw new BadRequestException('O horário de saída e chegada da carona são inválidos');
        }

        await this.ridesRepository.save(existingRide);

        return { updatedRide: existingRide };
    }


}