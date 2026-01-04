import { User } from 'src/domain/entities/user.entity';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';
import dayjs from 'src/core/config/dayjs.config';
import { TypeormRideEntity } from '../entities/typeorm-ride.entity';
import { Ride } from 'src/domain/entities/ride.entity';
import { UserMapper } from './user.mapper';
import { Money } from 'src/domain/value-objects/money.value-object';

export class RideMapper {
  static toDomain(entity: TypeormRideEntity): Ride {
    const ride = new Ride(
      UserMapper.toDomain(entity.driver),
      entity.origin,
      entity.destination,
      entity.departureTime,
      entity.arrivalTime,
      entity.totalSeats,
      Money.fromCents(entity.priceInCents),
    );
    ride.id = entity.id;
    ride.createdAt = dayjs(entity.createdAt).toDate();
    ride.updatedAt = dayjs(entity.updatedAt).toDate();
    return ride;
  }

  static toPersistence(ride: Ride): TypeormRideEntity {
    const entity = new TypeormRideEntity();
    entity.id = ride.id;
    entity.driver = UserMapper.toPersistence(ride.driver);
    entity.origin = ride.origin;
    entity.destination = ride.destination;
    entity.arrivalTime = ride.arrivalTime;
    entity.departureTime = ride.departureTime;
    entity.totalSeats = ride.totalSeats;
    entity.priceInCents = ride.price.toCents();

    return entity;
  }
}
