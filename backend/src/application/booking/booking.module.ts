import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { BookingController } from './booking.controller';
import { CreateBookingUseCase } from './use-cases/create-booking.use-case';
import { GetBookingUseCase } from './use-cases/get-booking.use-case';
import { FetchUserBookingsUseCase } from './use-cases/fetch-user-bookings.use-case';
import { CancelBookingUseCase } from './use-cases/cancel-booking.use-case';
import { UpdateBookingUseCase } from './use-cases/update-booking.use-case';

@Module({
  imports: [InfrastructureModule],
  controllers: [BookingController],
  providers: [
    CreateBookingUseCase,
    GetBookingUseCase,
    FetchUserBookingsUseCase,
    CancelBookingUseCase,
    UpdateBookingUseCase,
  ],
})
export class BookingsModule {}
