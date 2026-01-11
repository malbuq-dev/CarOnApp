import { Base } from './base.entity';
import { User } from './user.entity';

export class RefreshToken extends Base {
  token: string;
  user: User;
  expiryDate: Date;

  constructor(token: string, user: User, expiryDate: Date) {
    super();
    this.token = token;
    this.user = user;
    this.expiryDate = expiryDate;
  }

  rotate(newToken: string, newExpiryDate: Date) {
    this.token = newToken;
    this.expiryDate = newExpiryDate;
  }
}
