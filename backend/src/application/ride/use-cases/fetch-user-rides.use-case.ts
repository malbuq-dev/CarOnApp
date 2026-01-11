import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PaginationFilterType } from "src/core/types/pagination-filter.type";
import { Ride } from "src/domain/entities/ride.entity";
import { RIDES_REPOSITORY } from "src/domain/repositories/repository.tokens";
import type { RidesRepository } from "src/domain/repositories/rides.repository";

export interface FetchUserRidesRequest {
    userId: string,
    query: PaginationFilterType
}

export interface FetchUserRidesResponse {
    rides: Ride[]
}

@Injectable()
export class FetchUserRidesUseCase {
    constructor(
        @Inject(RIDES_REPOSITORY)
        private readonly ridesRepository: RidesRepository
    ) {}

    async execute(request: FetchUserRidesRequest): Promise<FetchUserRidesResponse> {
        const {userId, query } = request;

        const rides = await this.ridesRepository.findManyByAuthor(query, userId);

        return { rides };
    }
}