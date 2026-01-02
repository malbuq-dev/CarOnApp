import { User } from 'src/domain/entities/user.entity';

export class AuthPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  static toHTTPList(users: User[]) {
    return users.map((user) => this.toHTTP(user));
  }
}
