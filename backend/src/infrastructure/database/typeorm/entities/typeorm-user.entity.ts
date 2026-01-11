import { Column, Entity, OneToMany } from 'typeorm';
import { TypeormBaseEntity } from './typeorm-base.entity';

@Entity('users')
export class TypeormUserEntity extends TypeormBaseEntity {
  @Column({ nullable: false })
  public firstName: string;

  @Column({ nullable: false })
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: false })
  public password: string;
}
