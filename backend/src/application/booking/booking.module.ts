import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { BookingController } from './booking.controller';
import { CreateBookingUseCase } from './use-cases/create-booking.use-case';

@Module({
  imports: [InfrastructureModule],
  controllers: [BookingController],
  providers: [CreateBookingUseCase],
})
export class BookingsModule {}
