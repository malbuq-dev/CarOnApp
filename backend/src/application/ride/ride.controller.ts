import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CreateRideDto } from './dtos/create-ride.dto';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { CreateRideUseCase } from './use-cases/create-ride.use-case';
import { RidePresenter } from './ride.presenter';
import { DeleteRideUseCase } from './use-cases/delete-ride.use-case';
import { UpdateRideUseCase } from './use-cases/update-ride.use-case';
import { UpdateRideDto } from './dtos/update-ride.dto';
import { GetRideUseCase } from './use-cases/get-ride.use-case';
import type { PaginationFilterType } from 'src/core/types/pagination-filter.type';
import { FetchUserRidesUseCase } from './use-cases/fetch-user-rides.use-case';

@Controller('rides')
export class RideController {

    constructor(
        private readonly createRideUseCase: CreateRideUseCase,
        private readonly deleteRideUseCase: DeleteRideUseCase,
        private readonly updateRideUseCase: UpdateRideUseCase,
        private readonly getRideUseCase: GetRideUseCase,
        private readonly fetchUserRidesUseCase: FetchUserRidesUseCase,
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

    @Patch(':id')
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

        const updatedRide = RidePresenter.toHTTP(result.updatedRide);

        return {
            message: 'Corrida editada com sucesso',
            data: updatedRide
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async get(@Param('id', ParseUUIDPipe) id: string) {
        const result = await this.getRideUseCase.execute({
            id
        })

        const ride = RidePresenter.toHTTP(result.ride);

        return {
            message: 'Corrida recuperada com sucesso',
            data: ride
        }
    }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    async fetchMyOfferedRides(
        @Query() query: PaginationFilterType,
        @Req() req) {
            const result = await this.fetchUserRidesUseCase.execute({
                userId: req.userId,
                query
            });

            const rides = RidePresenter.toHTTPList(result.rides);

            return {
                message: 'Caronas do usuário recuperadas com sucesso',
                data: rides
            }
    }

    // TO-DO: Rides em um destino especifico em data especifica, e qnt de passageiros especifico, fazer isso flexivel


}
