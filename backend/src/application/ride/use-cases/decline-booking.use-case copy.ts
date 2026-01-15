import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RESPONSES } from "src/core/response/response.messages";
import { BOOKINGS_REPOSITORY, RIDES_REPOSITORY } from "src/domain/repositories/repository.tokens";
import type { RidesRepository } from "src/domain/repositories/rides.repository";

export interface DeclineBookingRequest {
    rideId: string,
    bookingId: string,
    userId: string
}

@Injectable()
export class DeclineBookingUseCase {
    constructor(
        @Inject(RIDES_REPOSITORY)
        private readonly ridesRespository: RidesRepository,
    ) {}

    async execute(request: DeclineBookingRequest) {
        const {
            rideId,
            bookingId,
            userId,
        } = request;

        const ride = await this.ridesRespository.findByIdWithBookings(rideId);

        if (!ride) {
            throw new NotFoundException(RESPONSES.RIDES.NOT_FOUND);
        }

        if (ride.driverId != userId) {
            throw new ForbiddenException(RESPONSES.RIDES.NOT_RIDE_OWNER);
        }

        ride.declineBooking(bookingId);

        await this.ridesRespository.save(ride);
    }
}