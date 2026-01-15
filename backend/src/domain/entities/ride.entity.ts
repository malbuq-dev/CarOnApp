import { Money } from '../value-objects/money.value-object';
import { Base } from './base.entity';
import { Booking } from './booking.entity';
import { User } from './user.entity';

export class Ride extends Base {
  driverId: string;
  bookings: Booking[] = [];
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  totalSeats: number;
  price: Money;

  constructor(
    driverId: string,
    origin: string,
    destination: string,
    departureTime: Date,
    arrivalTime: Date,
    totalSeats: number,
    price: Money,
  ) {
    super();
    this.driverId = driverId;
    this.origin = origin;
    this.destination = destination;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.totalSeats = totalSeats;
    this.price = price;
  }

  get occupiedSeats(): number {
    return this.bookings
      .filter((b) => b.isApproved())
      .reduce((sum, b) => sum + b.seatsBooked, 0);
  }

  get availableSeats(): number {
    return this.totalSeats - this.occupiedSeats;
  }

  hasEnoughSeats(seatsBooked: number): boolean {
    return this.availableSeats >= seatsBooked;
  }

  hasAvailableSeats(): boolean {
    return this.availableSeats > 0;
  }

  approveBooking(bookingId: string) {
    const booking = this.bookings.find((b) => b.id === bookingId);

    if (!booking) {
      throw new Error('Reserva não encontrada');
    }

    if (booking.isApproved()) {
      return null;
    }

    if (this.availableSeats < booking.seatsBooked) {
      throw new Error('Assentos insuficientes');
    }

    booking.approve();
  }

  static rehydrate(
    id: string,
    driverId: string,
    origin: string,
    destination: string,
    departureTime: Date,
    arrivalTime: Date,
    totalSeats: number,
    price: Money,
    bookings: Booking[],
  ): Ride {
    const ride = new Ride(
      driverId,
      origin,
      destination,
      departureTime,
      arrivalTime,
      totalSeats,
      price,
    );

    ride.id = id;
    ride.bookings = bookings;

    return ride;
  }
}
