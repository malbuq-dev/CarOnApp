import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationParams } from 'src/core/interfaces/pagination-params.interface';
import { PaginatedResponse } from 'src/core/interfaces/pagination-response.interface';
import { Ride } from 'src/domain/entities/ride.entity';
import { RIDES_REPOSITORY } from 'src/domain/repositories/repository.tokens';
import type { RidesRepository } from 'src/domain/repositories/rides.repository';

export interface FetchUserRidesRequest {
  userId: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
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
    const { 
      userId,
      page,
      limit,
      sortBy,
      sortOrder
    } = request;

    const query: PaginationParams = {
      page,
      limit,
      sortBy,
      sortOrder
    }

    const paginatedResult = await this.ridesRepository.findManyByAuthor(query, userId);

    return paginatedResult;
  }
}
