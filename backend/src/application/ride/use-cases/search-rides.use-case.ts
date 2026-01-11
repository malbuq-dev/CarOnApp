import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationFilterType } from 'src/core/types/pagination-filter.type';
import { Ride } from 'src/domain/entities/ride.entity';
import { RIDES_REPOSITORY } from 'src/domain/repositories/repository.tokens';
import type { RidesRepository } from 'src/domain/repositories/rides.repository';

export interface SearchRidesRequest {
  origin: string;
  destination: string;
  date: string;
  seats: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchRidesResponse {
  rides: Ride[];
}

@Injectable()
export class SearchRidesUseCase {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async execute(request: SearchRidesRequest): Promise<SearchRidesResponse> {
    const rides = await this.ridesRepository.searchRides(request);

    return { rides };
  }
}
