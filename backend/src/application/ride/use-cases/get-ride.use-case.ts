import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RESPONSES } from "src/core/response/response.messages";
import { Ride } from "src/domain/entities/ride.entity";
import { RIDES_REPOSITORY, USERS_REPOSITORY } from "src/domain/repositories/repository.tokens";
import type { RidesRepository } from "src/domain/repositories/rides.repository";
import type { UsersRepository } from "src/domain/repositories/users.repository";
import { Money } from "src/domain/value-objects/money.value-object";

export interface GetRideRequest {
  id: string;
}

export interface GetRideResponse {
    ride: Ride
}

@Injectable()
export class GetRideUseCase {
    constructor(
        @Inject(RIDES_REPOSITORY)
        private readonly ridesRepository: RidesRepository,
    ) {}

    async execute(createRideRequest: GetRideRequest): Promise<GetRideResponse> {
        const { id } = createRideRequest;

        const ride = await this.ridesRepository.findById(id);

        if (!ride) {
            throw new NotFoundException(RESPONSES.RIDES.NOT_FOUND);
        }

        return { ride };
    }

}