import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TypeormUserEntity } from "./typeorm-user.entity";
import { TypeormBaseEntity } from "./typeorm-base.entity";

@Entity('rides')
export class TypeormRideEntity extends TypeormBaseEntity {
    @ManyToOne(() => TypeormUserEntity, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: 'driver_id' })
    driver: TypeormUserEntity;

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