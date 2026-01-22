import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TypeormUserEntity } from './typeorm-user.entity';
import { TypeormBaseEntity } from './typeorm-base.entity';
import { TypeormRideEntity } from './typeorm-ride.entity';
import { BookingCancelReason, BookingStatus } from 'src/domain/entities/booking.entity';

@Entity('bookings')
export class TypeormBookingEntity extends TypeormBaseEntity {
  @Column({ name: 'ride_id' })
  rideId: string;

  @ManyToOne(
    () => TypeormRideEntity,
    ride => ride.bookings,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'ride_id' })
  ride: TypeormRideEntity;


  @Column({ name: 'passenger_id' })
  passengerId: string;

  @ManyToOne(() => TypeormUserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'passenger_id' })
  passenger: TypeormUserEntity;

  @Column({ name: 'seats_booked', type: 'int' })
  seatsBooked: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
  })
  status: BookingStatus;

  @Column({
    type: 'enum',
    enum: BookingCancelReason,
    nullable: true,
  })
  cancelReason: BookingCancelReason | null;
}
