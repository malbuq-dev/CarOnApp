import { Type } from "class-transformer";
import { IsDateString, IsDecimal, IsInt, IsNumber, IsOptional, IsString, Min, ValidateIf } from "class-validator";

export class UpdateRideDto {
    @IsString()
    @IsOptional()
    origin: string;

    @IsString()
    @IsOptional()
    destination: string;
    
    @IsDateString()
    @IsOptional()
    departureTime: string;
    
    @ValidateIf((ride) => new Date(ride.arrivalTime) > new Date(ride.departureTime))
    @IsOptional()
    arrivalTime: string;
    
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    totalSeats: number;
    
    @IsDecimal({ decimal_digits: '0,2' })
    @IsOptional()
    price: string;
}