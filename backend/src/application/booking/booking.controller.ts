import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { RESPONSES } from 'src/core/response/response.messages';
import { CreateBookingUseCase } from './use-cases/create-booking.use-case';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingPresenter } from './booking.presenter';
import { GetBookingUseCase } from './use-cases/get-booking.use-case';
import { FetchUserBookingsUseCase } from './use-cases/fetch-user-bookings.use-case';
import { PaginationQueryDto } from 'src/core/dtos/pagination-query.dto';
import { CancelBookingUseCase } from './use-cases/cancel-booking.use-case';

@Controller('bookings')
export class BookingController {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly getBookingUseCase: GetBookingUseCase,
    private readonly fetchUserBookingsUseCase: FetchUserBookingsUseCase,
    private readonly cancelBookingUseCase: CancelBookingUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req
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
  @UseGuards(JwtAuthGuard)
  async myBookings(
    @Query() pagination: PaginationQueryDto,
    @Req() req 
  ) {
    const { items, meta } = await this.fetchUserBookingsUseCase.execute({
      userId: req.userId,
      pagination
    });

    return {
      message: RESPONSES.BOOKINGS.FETCHED_SUCCESSFULLY,
      bookings: BookingPresenter.toHTTPList(items),
      meta: meta
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(
    @Param('id') id: string,
    @Req() req
  ) {
    const result = await this.getBookingUseCase.execute({
      bookingId: id,
      userId:  req.userId
    });

    return {
      message: RESPONSES.BOOKINGS.FETCH_BY_ID_SUCCESSFULLY,
      data: BookingPresenter.toHTTP(result.booking)
    }
  }

  @Post('/:id/cancel')
  @UseGuards(JwtAuthGuard)
  async cancel(
    @Param('id', ParseUUIDPipe) bookingId: string,
    @Req() req
  ) {
    await this.cancelBookingUseCase.execute({
      bookingId,
      userId: req.userId
    });

    return {
      message: RESPONSES.BOOKINGS.CANCELLED_SUCCESSFULLY,
    }
  }
}
