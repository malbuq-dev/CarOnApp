import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { TypeormUserEntity } from "./typeorm-user.entity";
import { TypeormBaseEntity } from "./typeorm-base.entity";
import { TypeormBookingEntity } from "./typeorm-booking.entity";

@Entity('rides')
export class TypeormRideEntity extends TypeormBaseEntity {
    @Column({ name: 'driver_id' })
    driverId: string;

    @ManyToOne(
        () => TypeormUserEntity, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: 'driver_id' })
    driver: TypeormUserEntity;

    @OneToMany(
        () => TypeormBookingEntity,
        booking => booking.ride,
        { cascade: true }
    )
    bookings: TypeormBookingEntity[];

    @Column()
    origin: string;

    @Column()
    destination: string;

    @Column({ type: 'timestamptz'})
    departureTime: Date;

    @Column({ type: 'timestamptz'})
    arrivalTime: Date;
    
    @Column({ type: 'int' })
    totalSeats: number;
    
    @Column({ type: 'int'})
    priceInCents: number;
}