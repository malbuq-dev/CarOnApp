import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/core/guard/jwt-auth.guard";
import { RESPONSES } from "src/core/response/response.messages";
import { CreateBookingUseCase } from "./use-cases/create-booking.use-case";
import { CreateBookingDto } from "./dtos/create-booking.dto";
import { BookingPresenter } from "./booking.presenter";

@Controller('bookings')
export class BookingController {
    constructor(
        private readonly createBookingUseCase: CreateBookingUseCase,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createBookingDto: CreateBookingDto, @Req() req) {
        const result = await this.createBookingUseCase.execute({
            passengerId: req.userId,
            ...createBookingDto
        });

        return {
            message: RESPONSES.BOOKINGS.CREATED_SUCCESSFULLY,
            data: BookingPresenter.toHTTP(result.booking)
        }
    }
}