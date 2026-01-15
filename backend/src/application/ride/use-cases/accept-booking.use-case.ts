import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RESPONSES } from "src/core/response/response.messages";
import type { BookingsRepository } from "src/domain/repositories/bookings.repository";
import { BOOKINGS_REPOSITORY, RIDES_REPOSITORY } from "src/domain/repositories/repository.tokens";
import type { RidesRepository } from "src/domain/repositories/rides.repository";

export interface AcceptBookingRequest {
    rideId: string,
    bookingId: string,
}

@Injectable()
export class AcceptBookingUseCase {
    constructor(
        @Inject(RIDES_REPOSITORY)
        private readonly ridesRespository: RidesRepository,
    ) {}

    async execute(request: AcceptBookingRequest) {
        const {
            rideId,
            bookingId,
        } = request;

        const ride = await this.ridesRespository.findByIdWithBookings(rideId);

        if (!ride) {
            throw new NotFoundException(RESPONSES.RIDES.NOT_FOUND);
        }

        ride.approveBooking(bookingId);

        await this.ridesRespository.save(ride);
    }
}