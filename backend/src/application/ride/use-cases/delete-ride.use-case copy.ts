import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Ride } from "src/domain/entities/ride.entity";
import { RIDES_REPOSITORY, USERS_REPOSITORY } from "src/domain/repositories/repository.tokens";
import type { RidesRepository } from "src/domain/repositories/ride.repository";

export interface UpdateRideRequest {
  rideId: string;
  userId: string;
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

    async execute(createRideRequest: UpdateRideRequest): Promise<UpdateRideResponse> {
        const {
            rideId,
            userId,
        } = createRideRequest;

        const existingRide = await this.ridesRepository.findByIdAndAuthorId(rideId, userId);

        if (!existingRide) {
            throw new NotFoundException('Corrida não encontrada');
        }

        

    }

}