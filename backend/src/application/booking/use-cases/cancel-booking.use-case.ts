import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { request } from "http";
import { NotFoundError } from "rxjs";
import { RESPONSES } from "src/core/response/response.messages";
import type { BookingsRepository } from "src/domain/repositories/bookings.repository";
import { BOOKINGS_REPOSITORY } from "src/domain/repositories/repository.tokens";

export interface CancelBookingRequest {
    bookingId: string;
    userId: string;
}

@Injectable()
export class CancelBookingUseCase {
    constructor(
        @Inject(BOOKINGS_REPOSITORY)
        private readonly bookingsRepository: BookingsRepository
    ) {}

    async execute(request: CancelBookingRequest) {
        const { bookingId, userId } = request;

        const booking = await this.bookingsRepository.findById(bookingId);

        if (booking?.passengerId != userId) {
            throw new ForbiddenException(RESPONSES.BOOKINGS.ONLY_BOOKING_OWNER_CAN_CANCEL);
        }

        booking.cancel()

        await this.bookingsRepository.save(booking);
    }
}