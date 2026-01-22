import { RESPONSES } from 'src/core/response/response.messages';
import { ActionRestrictedToPassengerError, BookingAlreadyCanceledError, BookingAlreadyDeclinedError, CannotBeUpdatableAfterApprovalError, CannotBeUpdatableAfterCancelingError, SeatsBookedMustBeGreatarThanZeroError } from '../errors/errors';
import { Base } from './base.entity';

export enum BookingStatus {
  DECLINED = 'Declined',
  APPROVED = 'Accepted',
  CANCELED = 'Canceled',
  PENDING = 'Pending',
}

export enum BookingCancelReason {
  PASSENGER = 'PASSENGER',
  RIDE_CANCELED = 'RIDE_CANCELED',
}


export class Booking extends Base {
  public seatsBooked: number;
  public status: BookingStatus;
  public rideId: string;
  public passengerId: string;
  public cancelReason?: BookingCancelReason;

  constructor(seatsBooked: number, rideId: string, passengerId: string) {
    super();
    this.seatsBooked = seatsBooked;
    this.rideId = rideId;
    this.passengerId = passengerId;
    this.status = BookingStatus.PENDING;
  }

  approve() {
    this.status = BookingStatus.APPROVED;
  }

  ensurePassenger(passengerId: string) {
    if (passengerId !== this.passengerId) throw new ActionRestrictedToPassengerError();
  }

  cancelByPassenger(passengerId: string) {
    this.ensurePassenger(passengerId);

    if (this.isCanceled()) {
      throw new BookingAlreadyCanceledError();
    }
    
    this.status = BookingStatus.CANCELED;
    this.cancelReason = BookingCancelReason.PASSENGER;
  }

  cancelByDriver() {
    if (this.isCanceled()) {
      throw new BookingAlreadyCanceledError();
    }
    
    this.status = BookingStatus.CANCELED;
    this.cancelReason = BookingCancelReason.RIDE_CANCELED;
  }
  
  decline() {
    if (this.isDeclined()) {
      throw new BookingAlreadyDeclinedError();
    }

    this.status = BookingStatus.DECLINED;
  }

  isApproved(): boolean {
    return this.status === BookingStatus.APPROVED;
  }

  isDeclined(): boolean {
    return this.status === BookingStatus.DECLINED;
  }

  isCanceled(): boolean {
    return this.status === BookingStatus.CANCELED;
  }

  static rehydrate(
    id: string,
    seatsBooked: number,
    status: BookingStatus,
    rideId: string,
    passengerId: string,
    cancelReason?: BookingCancelReason,
  ): Booking {
    const booking = new Booking(seatsBooked, rideId, passengerId);

    booking.id = id;
    booking.status = status;

    if (cancelReason) {
      booking.cancelReason = cancelReason;
    };

    return booking;
  }

  ensureIsUpdatable() {
    if (this.isCanceled()) {
        throw new CannotBeUpdatableAfterCancelingError();
    }

    if (this.isApproved()) {
        throw new CannotBeUpdatableAfterApprovalError();
    }
  }

  updateSeats(seatsBooked?: number) {
    this.ensureIsUpdatable();

    const newSeatsBooked = seatsBooked ?? this.seatsBooked;

    if (newSeatsBooked <= 0) {
      throw new SeatsBookedMustBeGreatarThanZeroError();
    }

    this.seatsBooked = newSeatsBooked;
  }
}
