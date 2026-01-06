import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RIDES_REPOSITORY, USERS_REPOSITORY } from "src/domain/repositories/repository.tokens";
import type { RidesRepository } from "src/domain/repositories/ride.repository";
import type { UsersRepository } from "src/domain/repositories/users.repository";

export interface DeleteRideRequest {
  rideId: string;
  userId: string;
}

@Injectable()
export class DeleteRideUseCase {
    constructor(
        @Inject(RIDES_REPOSITORY)
        private readonly ridesRepository: RidesRepository,
    ) {}

    async execute(createRideRequest: DeleteRideRequest): Promise<void> {
        const {
            rideId,
            userId,
        } = createRideRequest;

        const existingRide = await this.ridesRepository.findByIdAndAuthorId(rideId, userId);

        if (!existingRide) {
            throw new NotFoundException('Carona não encontrada');
        }

        await this.ridesRepository.deleteByIdAndAuthorId(rideId, userId);
    }

}