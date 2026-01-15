import { Ride } from 'src/domain/entities/ride.entity';

export class RidePresenter {
  static toHTTP(ride: Ride) {
    const approvedBookings = ride.approvedBookings?.map(booking => {
      return {
        id: booking.id,
        passengerId: booking.passengerId,
      };
    });

    return {
      driver: {
        id: ride.driverId,
      },
      id: ride.id,
      origin: ride.origin,
      destination: ride.destination,
      departureTime: ride.departureTime.toISOString(),
      arrivalTime: ride.arrivalTime.toISOString(),
      totalSeats: ride.totalSeats,
      price: ride.price.toDecimal(),
      approvedBookings,
    };
  }

  static toHTTPList(rides: Ride[]) {
    return rides.map((ride) => this.toHTTP(ride));
  }
}
