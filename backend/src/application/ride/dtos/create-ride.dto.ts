import { Type } from "class-transformer";
import { IsDateString, IsDecimal, IsInt, IsNumber, IsString, Min, ValidateIf } from "class-validator";

export class CreateRideDto {
    @IsString()
    origin: string;

    @IsString()
    destination: string;
    
    @IsDateString()
    departureTime: string;
    
    @IsDateString()
    arrivalTime: string;
    
    @Type(() => Number)
    @IsInt()
    @Min(1)
    totalSeats: number;
    
    @IsDecimal({ decimal_digits: '0,2' })
    price: string;
}