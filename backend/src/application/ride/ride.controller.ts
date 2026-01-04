import { Body, Controller, Delete, Param, ParseUUIDPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateRideDto } from './dtos/create-ride.dto';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { CreateRideUseCase } from './use-cases/create-ride.use-case';
import { RidePresenter } from './ride.presenter';
import { DeleteRideUseCase } from './use-cases/delete-ride.use-case';
import { UpdateRideUseCase } from './use-cases/update-ride.use-case';
import { UpdateRideDto } from './dtos/update-ride.dto';

@Controller('rides')
export class RideController {

    constructor(
        private readonly createRideUseCase: CreateRideUseCase,
        private readonly deleteRideUseCase: DeleteRideUseCase,
        private readonly updateRideUseCase: UpdateRideUseCase,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createRideDto: CreateRideDto, @Req() req) {
        const result = await this.createRideUseCase.execute({
            driverId: req.userId,
            origin: createRideDto.origin,
            destination: createRideDto.destination,
            departureTime: createRideDto.departureTime,
            arrivalTime: createRideDto.arrivalTime,
            totalSeats: createRideDto.totalSeats,
            priceString: createRideDto.price,
        });

        const ride = RidePresenter.toHTTP(result.ride);

        return {
            message: 'Corrida criada com sucesso',
            data: ride
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id', ParseUUIDPipe) rideId: string, @Req() req) {
        await this.deleteRideUseCase.execute({
            rideId: rideId,
            userId: req.userId
        });

        return {
            message: 'Corrida removida com sucesso'
        }
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id', ParseUUIDPipe) rideId: string,
        @Body() updateRideDto: UpdateRideDto,
        @Req() req) {
        const result = await this.updateRideUseCase.execute({
            rideId,
            userId: req.userId,
            ...updateRideDto
        });

        const updatedRide = RidePresenter.toHTTP(result.ride);

        return {
            message: 'Corrida removida com sucesso',
            data: updatedRide
        }
    }
}
