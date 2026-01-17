import { Module } from '@nestjs/common';
import { RideController } from './ride.controller';
import { CreateRideUseCase } from './use-cases/create-ride.use-case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { DeleteRideUseCase } from './use-cases/delete-ride.use-case';
import { UpdateRideUseCase } from './use-cases/update-ride.use-case';
import { GetRideUseCase } from './use-cases/get-ride.use-case';
import { FetchUserRidesUseCase } from './use-cases/fetch-user-rides.use-case';
import { SearchRidesUseCase } from './use-cases/search-rides.use-case';
import { AcceptBookingUseCase } from './use-cases/accept-booking.use-case';
import { DeclineBookingUseCase } from './use-cases/decline-booking.use-case copy';
import { FetchRideBookingsUseCase } from './use-cases/fetch-ride-bookings.use-case';

@Module({
  imports: [InfrastructureModule],
  controllers: [RideController],
  providers: [
    CreateRideUseCase,
    DeleteRideUseCase,
    UpdateRideUseCase,
    GetRideUseCase,
    FetchUserRidesUseCase,
    SearchRidesUseCase,
    AcceptBookingUseCase,
    DeclineBookingUseCase,
    FetchRideBookingsUseCase,
  ],
})
export class RidesModule {}
