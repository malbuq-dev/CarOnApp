import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationParams } from 'src/core/types/pagination-params.interface';
import { PaginatedResponse } from 'src/core/types/pagination-response.interface';
import { Ride } from 'src/domain/entities/ride.entity';
import { RIDES_REPOSITORY } from 'src/domain/repositories/repository.tokens';
import type { RidesRepository } from 'src/domain/repositories/rides.repository';

export interface FetchUserRidesRequest {
  userId: string;
  query: PaginationParams;
}
@Injectable()
export class FetchUserRidesUseCase {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async execute(
    request: FetchUserRidesRequest,
  ): Promise<PaginatedResponse<Ride>> {
    const { userId, query } = request;

    const paginatedResult = await this.ridesRepository.findManyByAuthor(query, userId);

    return paginatedResult;
  }
}
