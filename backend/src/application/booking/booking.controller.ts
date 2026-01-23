import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { RESPONSES } from 'src/core/response/response.messages';

import { CreateBookingUseCase } from './use-cases/create-booking.use-case';
import { GetBookingUseCase } from './use-cases/get-booking.use-case';
import { FetchUserBookingsUseCase } from './use-cases/fetch-user-bookings.use-case';
import { CancelBookingUseCase } from './use-cases/cancel-booking.use-case';
import { UpdateBookingUseCase } from './use-cases/update-booking.use-case';

import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';
import { PaginationQueryDto } from 'src/core/dtos/pagination-query.dto';

import { BookingPresenter } from './booking.presenter';

@ApiTags('Bookings')
@ApiBearerAuth()
@Controller('bookings')
export class BookingController {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly getBookingUseCase: GetBookingUseCase,
    private readonly fetchUserBookingsUseCase: FetchUserBookingsUseCase,
    private readonly cancelBookingUseCase: CancelBookingUseCase,
    private readonly updateBookingUseCase: UpdateBookingUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova reserva em uma carona' })
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req,
  ) {
    const result = await this.createBookingUseCase.execute({
      passengerId: req.userId,
      ...createBookingDto,
    });

    return {
      message: RESPONSES.BOOKINGS.CREATED_SUCCESSFULLY,
      data: BookingPresenter.toHTTP(result.booking),
    };
  }

  @Get('/me')
  @ApiOperation({ summary: 'Lista todas as reservas do usuário autenticado' })
  @UseGuards(JwtAuthGuard)
  async myBookings(
    @Query() pagination: PaginationQueryDto,
    @Req() req,
  ) {
    const { items, meta } = await this.fetchUserBookingsUseCase.execute({
      userId: req.userId,
      pagination,
    });

    return {
      message: RESPONSES.BOOKINGS.FETCHED_SUCCESSFULLY,
      bookings: BookingPresenter.toHTTPList(items),
      meta,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma reserva pelo ID' })
  @UseGuards(JwtAuthGuard)
  async get(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ) {
    const result = await this.getBookingUseCase.execute({
      bookingId: id,
      userId: req.userId,
    });

    return {
      message: RESPONSES.BOOKINGS.FETCH_BY_ID_SUCCESSFULLY,
      data: BookingPresenter.toHTTP(result.booking),
    };
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancela uma reserva (somente passageiro)' })
  @UseGuards(JwtAuthGuard)
  async cancel(
    @Param('id', ParseUUIDPipe) bookingId: string,
    @Req() req,
  ) {
    await this.cancelBookingUseCase.execute({
      bookingId,
      userId: req.userId,
    });

    return {
      message: RESPONSES.BOOKINGS.CANCELLED_SUCCESSFULLY,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de uma reserva existente' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseUUIDPipe) bookingId: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Req() req,
  ) {
    const { seatsBooked } = updateBookingDto;

    const result = await this.updateBookingUseCase.execute({
      bookingId,
      seatsBooked,
      userId: req.userId,
    });

    return {
      message: RESPONSES.BOOKINGS.UPDATED_SUCCESSFULLY,
      data: BookingPresenter.toHTTP(result.booking),
    };
  }
}
