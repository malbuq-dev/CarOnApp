import { RESPONSES } from "src/core/response/response.messages";

export class RideAlreadyDepartedError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.CANNOT_BOOK_AFTER_RIDE_DEPARTURE);
  }
}

export class DriverCannotBookOwnRideError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.DRIVER_CANT_BOOK_OWN_RIDE);
  }
}

export class BookingAlreadyCanceledError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.BOOKING_IS_ALREADY_CANCELED);
  }
}

export class BookingAlreadyDeclinedError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.BOOKING_IS_ALREADY_DECLINED);
  }
}

export class ActionRestrictedToDriverError extends Error {
  constructor() {
    super(RESPONSES.RIDES.NOT_RIDE_OWNER);
  }
}

export class ActionRestrictedToPassengerError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.ONLY_BOOKING_OWNER_CAN_CANCEL);
  }
}

export class NotAvailableSeatsError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.NO_AVALIABLE_SEATS);
  }
}

export class CouldNotFindBookingError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.NOT_FOUND);
  }
}

export class InvalidDepartureOrArrivalTimeError extends Error {
  constructor() {
    super(RESPONSES.RIDES.ARRIVAL_AND_DEPARTURE_TIME_INCONSISTENT);
  }
}

export class CannotReduceSeatsBelowApprovedBookingsError extends Error {
  constructor() {
    super(RESPONSES.RIDES.CANNOT_REDUCE_SEATS_BELOW_APPROVED_BOOKINGS);
  }
}

export class OriginAndDestinationMustBeDifferentError extends Error {
  constructor() {
    super(RESPONSES.RIDES.CANNOT_REDUCE_SEATS_BELOW_APPROVED_BOOKINGS);
  }
}

export class CanceledRideCannotBeUpdatedError extends Error {
  constructor() {
    super(RESPONSES.RIDES.CANNOT_UPDATE_CANCELED_RIDE);
  }
}

export class RideWithApprovedBookingsCannotBeUpdatedError extends Error {
  constructor() {
    super(RESPONSES.RIDES.CANNOT_UPDATE_RIDE_WITH_APPROVED_BOOKINGS);
  }
}

export class RidePriceMustBeGreaterThanZeroError extends Error {
  constructor() {
    super(RESPONSES.RIDES.PRICE_MUST_BE_GREATER_THAN_ZERO);
  }
}

export class SeatsBookedMustBeGreatarThanZeroError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.SEATS_BOOKED_MUST_BE_GREATER_THAN_ZERO);
  }
}

export class CannotBeUpdatableAfterCancelingError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.CANNOT_UPDATE_AFTER_CANCELING);
  }
}
export class CannotBeUpdatableAfterApprovalError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.CANNOT_BE_UPDATED_AFTER_APPROVAL);
  }
}
export class BookedSeatsCannotBeGreatarThanTotalSeatsError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.CANNOT_BOOK_MORE_SEATS_THAN_TOTAL_RIDE_SEATS);
  }
}
export class ApprovedBookingsCannotBeUpdatedError extends Error {
  constructor() {
    super(RESPONSES.BOOKINGS.CANNOT_BE_UPDATED_AFTER_APPROVAL);
  }
}



