import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';

export class TypeormBaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;
}
