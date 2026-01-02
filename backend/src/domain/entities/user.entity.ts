import { Base } from "./base.entity";

export class User extends Base {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    changePassword(newPassword: string) {
        this.password = newPassword;
    }
}