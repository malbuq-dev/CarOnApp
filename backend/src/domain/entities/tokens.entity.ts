import { Base } from "./base.entity";

export class Tokens extends Base { 
    accessToken: string;
    refreshToken: string;

    constructor(
        accessToken: string,
        refreshToken: string,
    ) { 
        super();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}