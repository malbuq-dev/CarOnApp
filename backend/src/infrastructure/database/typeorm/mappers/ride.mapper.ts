import { User } from 'src/domain/entities/user.entity';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';
import dayjs from 'src/core/config/dayjs.config';
import { TypeormRideEntity } from '../entities/typeorm-ride.entity';
import { Ride } from 'src/domain/entities/ride.entity';
import { UserMapper } from './user.mapper';
import { Money } from 'src/domain/value-objects/money.value-object';
import { BookingMapper } from './booking.mapper';
import { Booking } from 'src/domain/entities/booking.entity';

export class RideMapper {
  static toDomain(entity: TypeormRideEntity): Ride {
    const bookings = entity.bookings?.map(BookingMapper.toDomain) ?? [];

    return Ride.rehydrate(
      entity.id,
      entity.driverId,
      entity.origin,
      entity.destination,
      entity.departureTime,
      entity.arrivalTime,
      entity.totalSeats,
      Money.fromCents(entity.priceInCents),
      bookings,
    );
  }

  static toPersistence(ride: Ride): TypeormRideEntity {
    const entity = new TypeormRideEntity();
    entity.id = ride.id;
    entity.driverId = ride.driverId;
    entity.origin = ride.origin;
    entity.destination = ride.destination;
    entity.arrivalTime = ride.arrivalTime;
    entity.departureTime = ride.departureTime;
    entity.totalSeats = ride.totalSeats;
    entity.priceInCents = ride.price.toCents();

    return entity;
  }
}
