import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { request } from "http";
import { NotFoundError } from "rxjs";
import { RESPONSES } from "src/core/response/response.messages";
import { BookingCancelReason } from "src/domain/entities/booking.entity";
import { mapDomainErrorToHttp } from "src/domain/errors/http-error.mapper";
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

        if (!booking) {
            throw new NotFoundException(RESPONSES.BOOKINGS.NOT_FOUND);
        }

        if (booking.passengerId != userId) {
            throw new ForbiddenException(RESPONSES.BOOKINGS.ONLY_BOOKING_OWNER_CAN_CANCEL);
        }

        try {
            booking.cancelByPassenger(userId);
            await this.bookingsRepository.save(booking);
        }
        catch (error) {
            mapDomainErrorToHttp(error);
        }

    }
}