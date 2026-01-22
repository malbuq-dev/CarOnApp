import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RESPONSES } from "src/core/response/response.messages";
import { mapDomainErrorToHttp } from "src/domain/errors/http-error.mapper";
import type { BookingsRepository } from "src/domain/repositories/bookings.repository";
import { BOOKINGS_REPOSITORY, RIDES_REPOSITORY } from "src/domain/repositories/repository.tokens";
import type { RidesRepository } from "src/domain/repositories/rides.repository";

export interface AcceptBookingRequest {
    rideId: string,
    bookingId: string,
    userId: string,
}

@Injectable()
export class AcceptBookingUseCase {
    constructor(
        @Inject(RIDES_REPOSITORY)
        private readonly ridesRepository: RidesRepository,
    ) {}

    async execute(request: AcceptBookingRequest) {
        const ride = await this.ridesRepository.findByIdWithBookings(request.rideId);

        if (!ride) {
            throw new NotFoundException(RESPONSES.RIDES.NOT_FOUND);
        }
        
        try {
            ride.approveBooking(request.userId, request.bookingId);
            await this.ridesRepository.save(ride);
        } catch (error) {
            mapDomainErrorToHttp(error);
        }
    }

}