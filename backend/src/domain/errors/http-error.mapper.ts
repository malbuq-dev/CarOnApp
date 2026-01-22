import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import {
  RideAlreadyDepartedError,
  DriverCannotBookOwnRideError,
  BookingAlreadyCanceledError,
  BookingAlreadyDeclinedError,
  ActionRestrictedToDriverError,
  ActionRestrictedToPassengerError,
  NotAvailableSeatsError,
  CouldNotFindBookingError,
  InvalidDepartureOrArrivalTimeError,
  CannotReduceSeatsBelowApprovedBookingsError,
  OriginAndDestinationMustBeDifferentError,
  CanceledRideCannotBeUpdatedError,
  RideWithApprovedBookingsCannotBeUpdatedError,
  RidePriceMustBeGreaterThanZeroError,
  SeatsBookedMustBeGreatarThanZeroError,
  CannotBeUpdatableAfterCancelingError,
  CannotBeUpdatableAfterApprovalError,
  BookedSeatsCannotBeGreatarThanTotalSeatsError,
  ApprovedBookingsCannotBeUpdatedError,
} from './errors';

export function mapDomainErrorToHttp(error: Error): never {
  // -------- NOT FOUND --------
  if (error instanceof CouldNotFindBookingError) {
    throw new NotFoundException(error.message);
  }

  // -------- FORBIDDEN --------
  if (
    error instanceof ActionRestrictedToDriverError ||
    error instanceof ActionRestrictedToPassengerError
  ) {
    throw new ForbiddenException(error.message);
  }

  // -------- CONFLICT (STATE) --------
  if (
    error instanceof BookingAlreadyCanceledError ||
    error instanceof BookingAlreadyDeclinedError ||
    error instanceof CannotBeUpdatableAfterCancelingError ||
    error instanceof CannotBeUpdatableAfterApprovalError ||
    error instanceof ApprovedBookingsCannotBeUpdatedError ||
    error instanceof CanceledRideCannotBeUpdatedError ||
    error instanceof RideWithApprovedBookingsCannotBeUpdatedError
  ) {
    throw new ConflictException(error.message);
  }

  // -------- BAD REQUEST (BUSINESS RULES) --------
  if (
    error instanceof RideAlreadyDepartedError ||
    error instanceof DriverCannotBookOwnRideError ||
    error instanceof NotAvailableSeatsError ||
    error instanceof InvalidDepartureOrArrivalTimeError ||
    error instanceof CannotReduceSeatsBelowApprovedBookingsError ||
    error instanceof OriginAndDestinationMustBeDifferentError ||
    error instanceof RidePriceMustBeGreaterThanZeroError ||
    error instanceof SeatsBookedMustBeGreatarThanZeroError ||
    error instanceof BookedSeatsCannotBeGreatarThanTotalSeatsError
  ) {
    throw new BadRequestException(error.message);
  }

  // -------- FALLBACK --------
  throw error;
}
