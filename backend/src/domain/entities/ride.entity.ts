import { ActionRestrictedToDriverError, ActionRestrictedToPassengerError, ApprovedBookingsCannotBeUpdatedError, BookedSeatsCannotBeGreatarThanTotalSeatsError, CanceledRideCannotBeUpdatedError, CannotReduceSeatsBelowApprovedBookingsError, CouldNotFindBookingError, DriverCannotBookOwnRideError, InvalidDepartureOrArrivalTimeError, NotAvailableSeatsError, OriginAndDestinationMustBeDifferentError, RideAlreadyDepartedError, RidePriceMustBeGreaterThanZeroError, RideWithApprovedBookingsCannotBeUpdatedError, SeatsBookedMustBeGreatarThanZeroError } from '../errors/errors';
import { Money } from '../value-objects/money.value-object';
import { Base } from './base.entity';
import { Booking, BookingCancelReason } from './booking.entity';

export enum RideStatus {
  ACTIVE = 'Active',
  CANCELED = 'Canceled',
}

export class Ride extends Base {
  driverId: string;
  bookings: Booking[] = [];
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  totalSeats: number;
  price: Money;
  status: RideStatus;

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
    this.status = RideStatus.ACTIVE;
  }

  isActive(): boolean {
    return this.status === RideStatus.ACTIVE;
  }

  ensureDriver(actorId: string) {
    if (actorId != this.driverId) {
      throw new ActionRestrictedToDriverError();
    }
  }

  cancel(actorId: string) {
    this.ensureDriver(actorId);

    this.status = RideStatus.CANCELED;
    
    for (const booking of this.bookings) {
      booking.cancelByDriver();
    }
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


  approveBooking(driverId: string, bookingId: string) {
    this.ensureDriver(driverId);

    const booking = this.bookings.find((b) => b.id === bookingId);

    if (!booking) {
      throw new CouldNotFindBookingError();
    }

    if (booking.isApproved()) {
      return;
    }

    if (this.availableSeats < booking.seatsBooked) {
      throw new NotAvailableSeatsError();
    }

    booking.approve();
  }

  declineBooking(actorId: string, bookingId: string) {
    this.ensureDriver(actorId);

    const booking = this.bookings.find((b) => b.id === bookingId);

    if (!booking) {
      throw new CouldNotFindBookingError();
    }

    if (booking.isDeclined()) {
      return;
    }

    booking.decline();
  }

  get approvedBookings(): Booking[] {
    return this.bookings.filter(b => b.isApproved());
  }

  requestBooking(
    passengerId: string,
    seatsBooked: number,
    now: Date,
  ): Booking {
    if (this.driverId === passengerId) {
      throw new DriverCannotBookOwnRideError();
    }

    if (now >= this.departureTime) {
      throw new RideAlreadyDepartedError();
    }

    if (seatsBooked <= 0) {
      throw new SeatsBookedMustBeGreatarThanZeroError();
    }

    if (seatsBooked > this.totalSeats) {
      throw new BookedSeatsCannotBeGreatarThanTotalSeatsError();
    }

    
    return new Booking(
      seatsBooked,
      this.id,
      passengerId,
    );
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
    status: RideStatus,
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
    ride.status = status;

    return ride;
  }

  static create(
    driverId: string,
    origin: string,
    destination: string,
    departureTime: Date,
    arrivalTime: Date,
    totalSeats: number,
    price: Money,
  ): Ride {

    if (arrivalTime <= departureTime) {
        throw new InvalidDepartureOrArrivalTimeError();
    }   

    const ride = new Ride(
      driverId,
      origin,
      destination,
      departureTime,
      arrivalTime,
      totalSeats,
      price,
    );

    return ride;
  }

  ensureIsUpdatable() {
    if (!this.isActive()) {
      throw new CanceledRideCannotBeUpdatedError();
    }

    if (this.occupiedSeats > 0) {
      throw new RideWithApprovedBookingsCannotBeUpdatedError();
    }
  }

  updateRoute(origin?: string, destination?: string) {
    this.ensureIsUpdatable();

    const newOrigin = origin ?? this.origin;
    const newDestination = destination ?? this.destination;

    if (newOrigin === newDestination) {
      throw new OriginAndDestinationMustBeDifferentError();
    }

    this.origin = newOrigin;
    this.destination = newDestination;
  }

  updateSchedule(departureTime?: Date, arrivalTime?: Date) {
    this.ensureIsUpdatable();

    const newDeparture = departureTime ?? this.departureTime;
    const newArrival = arrivalTime ?? this.arrivalTime;

    if (newArrival <= newDeparture) {
      throw new InvalidDepartureOrArrivalTimeError();
    }

    this.departureTime = newDeparture;
    this.arrivalTime = newArrival;
  }

  updateSeats(totalSeats?: number) {
    this.ensureIsUpdatable();

    const newTotalSeats = totalSeats ?? this.totalSeats;

    this.totalSeats = newTotalSeats;
  }

  updatePrice(price?: Money) {
    this.ensureIsUpdatable();

    const newPrice = price ?? this.price;

    if (newPrice.toCents() <= 0) {
      throw new RidePriceMustBeGreaterThanZeroError();
    }

    this.price = newPrice;
  }

  updateBooking(
    bookingId: string,
    actorId: string,
    updateData : {newSeatsBooked?: number}): Booking {
    
    const booking = this.bookings.find((b) => b.id === bookingId);

    if (!booking) {
      throw new CouldNotFindBookingError();
    }

    if (actorId != booking.passengerId) {
      throw new ActionRestrictedToPassengerError();
    }
  
    if (booking.isApproved()) {
      throw new ApprovedBookingsCannotBeUpdatedError();
    }

    const { newSeatsBooked } = updateData;

    if (newSeatsBooked != undefined && !this.hasEnoughSeats(newSeatsBooked)) {
      throw new BookedSeatsCannotBeGreatarThanTotalSeatsError();
    }

    booking.updateSeats(newSeatsBooked);
    
    return booking;
  }

}
