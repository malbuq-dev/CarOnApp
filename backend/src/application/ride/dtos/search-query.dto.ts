import { IsOptional, IsString, IsNumber, Min, IsDateString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchRidesQueryDto {
  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  seats: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsIn(['departureTime', 'price', 'createdAt'])
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
