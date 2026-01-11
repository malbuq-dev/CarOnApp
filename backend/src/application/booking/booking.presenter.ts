import { Booking } from 'src/domain/entities/booking.entity';

export class BookingPresenter {
  static toHTTP(booking: Booking) {
    return {
      passenger: {
        id: booking.passengerId,
      },
      ride: {
        id: booking.rideId,
      },
      id: booking.id,
      seatsBooked: booking.seatsBooked,
      status: booking.status,
    };
  }

  static toHTTPList(booking: Booking[]) {
    return booking.map((booking) => this.toHTTP(booking));
  }
}
