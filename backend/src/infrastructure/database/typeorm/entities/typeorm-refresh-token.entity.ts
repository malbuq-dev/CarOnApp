import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne } from "typeorm";
import { TypeormBaseEntity } from "./typeorm-base.entity";
import { TypeormUserEntity } from "./typeorm-user.entity";

@Entity('refresh_tokens')
export class TypeormRefreshTokenEntity extends TypeormBaseEntity {
    @CreateDateColumn({ type: 'timestamptz'})
    public expiryDate: Date;

    @Column()
    public token: string;

    @OneToOne(() => TypeormUserEntity, { onDelete: 'CASCADE' })
    @JoinColumn()
    public user: TypeormUserEntity;
}