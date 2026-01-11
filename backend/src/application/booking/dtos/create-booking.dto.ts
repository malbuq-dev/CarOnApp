import { Type } from "class-transformer";
import { IsInt, IsUUID, Min } from "class-validator";

export class CreateBookingDto {
    @IsUUID()
    rideId: string;
    
    @Type(() => Number)
    @IsInt()
    @Min(1)
    seatsBooked: number;
}