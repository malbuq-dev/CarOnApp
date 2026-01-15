import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { CreateRideDto } from './dtos/create-ride.dto';
import { UpdateRideDto } from './dtos/update-ride.dto';
import { SearchRidesQueryDto } from './dtos/search-query.dto';

import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';

import { CreateRideUseCase } from './use-cases/create-ride.use-case';
import { DeleteRideUseCase } from './use-cases/delete-ride.use-case';
import { UpdateRideUseCase } from './use-cases/update-ride.use-case';
import { GetRideUseCase } from './use-cases/get-ride.use-case';
import { FetchUserRidesUseCase } from './use-cases/fetch-user-rides.use-case';
import { SearchRidesUseCase } from './use-cases/search-rides.use-case';

import { RidePresenter } from './ride.presenter';
import { RESPONSES } from 'src/core/response/response.messages';
import { AcceptBookingUseCase } from './use-cases/accept-booking.use-case';
import { PaginationQueryDto } from 'src/core/dtos/pagination-query.dto';
import { DeclineBookingUseCase } from './use-cases/decline-booking.use-case copy';

@ApiTags('Rides')
@ApiBearerAuth()
@Controller('rides')
export class RideController {
  constructor(
    private readonly createRideUseCase: CreateRideUseCase,
    private readonly deleteRideUseCase: DeleteRideUseCase,
    private readonly updateRideUseCase: UpdateRideUseCase,
    private readonly getRideUseCase: GetRideUseCase,
    private readonly fetchUserRidesUseCase: FetchUserRidesUseCase,
    private readonly searchRidesUseCase: SearchRidesUseCase,
    private readonly acceptBookingUseCase: AcceptBookingUseCase,
    private readonly declineBookingUseCase: DeclineBookingUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova carona' })
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

    return {
      message: RESPONSES.RIDES.CREATED_SUCCESSFULLY,
      data: RidePresenter.toHTTP(result.ride),
    };
  }

  @Get('/me')
  @ApiOperation({ summary: 'Lista todas as caronas do usuário autenticado' })
  @UseGuards(JwtAuthGuard)
  async fetchMyRides(@Query() query: PaginationQueryDto, @Req() req) {
    const { items, meta } = await this.fetchUserRidesUseCase.execute({
      userId: req.userId,
      ...query,
    });

    return {
      message: RESPONSES.RIDES.FETCHED_SUCCESSFULLY,
      rides: RidePresenter.toHTTPList(items),
      meta: meta
    };
  }

  @Get()
  @ApiOperation({ summary: 'Busca caronas com base nos filtros informados' })
  async search(@Query() query: SearchRidesQueryDto) {
    const result = await this.searchRidesUseCase.execute(query);

    return {
      message: RESPONSES.RIDES.FETCHED_SUCCESSFULLY,
      data: RidePresenter.toHTTPList(result.rides),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma carona pelo ID' })
  async get(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.getRideUseCase.execute({ id });

    return {
      message: RESPONSES.RIDES.FETCH_BY_ID_SUCCESSFULLY,
      data: RidePresenter.toHTTP(result.ride),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de uma carona existente' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseUUIDPipe) rideId: string,
    @Body() updateRideDto: UpdateRideDto,
    @Req() req,
  ) {
    const result = await this.updateRideUseCase.execute({
      rideId,
      userId: req.userId,
      ...updateRideDto,
    });

    return {
      message: RESPONSES.RIDES.UPDATED_SUCCESSFULLY,
      data: RidePresenter.toHTTP(result.updatedRide),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma carona pelo ID' })
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseUUIDPipe) rideId: string, @Req() req) {
    await this.deleteRideUseCase.execute({
      rideId,
      userId: req.userId,
    });
    
    return {
      message: RESPONSES.RIDES.DELETED_SUCCESSFULLY,
    };
  }
  
  @Post('/:rideId/bookings/:bookingId/approve')
  @UseGuards(JwtAuthGuard)
  async acceptBooking(
    @Param('rideId') rideId: string,
    @Param('bookingId') bookingId: string,
    @Req() req,
  ) {
    await this.acceptBookingUseCase.execute({
        rideId,
        bookingId,
        userId: req.userId,
    });
  }

  @Post('/:rideId/bookings/:bookingId/decline')
  @UseGuards(JwtAuthGuard)
  async declineBooking(
    @Param('rideId') rideId: string,
    @Param('bookingId') bookingId: string,
    @Req() req,
  ) {
      await this.declineBookingUseCase.execute({
        rideId,
        bookingId,
        userId: req.userId
    });
  }
}