import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateRideDto } from './dtos/create-ride.dto';
import { AuthenticationGuard } from 'src/core/guard/auth.guard';

@Controller('ride')
export class RideController {

    constructor(
        private readonly createRideUseCase: CreateRideUseCase,
    ) {}

    @Post('create')
    @UseGuards(AuthenticationGuard)
    async create(@Body() createRideDto: CreateRideDto, @Req() req) {
        const result = await this.createRideUseCase.execute({
            driverId: req.userId,
            origin: createRideDto.origin,
            destination: createRideDto.destination,
            departureTime: createRideDto.departureTime,
            arrivalTime: createRideDto.arrivalTime,
            totalSeats: createRideDto.totalSeats,
            price: createRideDto.price,
        });

        const ride = RidePresenter.toHttp(result.ride);

        return {
            message: 'Corrida criada com sucesso',
            data: ride
        }
    }
}
