import { randomUUID } from 'node:crypto';

export class Base {
  public id: string;
  public createdAt: Date;
  public updatedAt?: Date;

  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date();
    this.updatedAt = undefined;
  }
}
