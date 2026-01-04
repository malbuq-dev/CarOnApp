import { Module } from '@nestjs/common';
import { RideController } from './ride.controller';
import { CreateRideUseCase } from './use-cases/create-ride.use-case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { DeleteRideUseCase } from './use-cases/delete-ride.use-case';

@Module({
  imports: [InfrastructureModule],
  controllers: [RideController],
  providers: [
    CreateRideUseCase,
    DeleteRideUseCase,
  ]
})
export class RideModule {}
