import dayjs from 'src/core/config/dayjs.config';
import { UserMapper } from './user.mapper';
import { TypeormBookingEntity } from '../entities/typeorm-booking.entity';
import { Booking } from 'src/domain/entities/booking.entity';
import { RideMapper } from './ride.mapper';

export class BookingMapper {
  static toDomain(entity: TypeormBookingEntity): Booking {
    const booking = Booking.rehydrate(
      entity.id,
      entity.seatsBooked,
      entity.status,
      entity.rideId,
      entity.passengerId,
    );
    booking.createdAt = dayjs(entity.createdAt).toDate();
    booking.updatedAt = dayjs(entity.updatedAt).toDate();
    return booking;
  }

  static toPersistence(booking: Booking): TypeormBookingEntity {
    const entity = new TypeormBookingEntity();
    entity.id = booking.id;
    entity.seatsBooked = booking.seatsBooked;
    entity.status = booking.status;
    entity.rideId = booking.rideId;
    entity.passengerId = booking.passengerId;

    return entity;
  }
}
