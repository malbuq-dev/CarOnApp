import { Tokens } from 'src/domain/entities/tokens.entity';

export class TokensPresenter {
  static toHTTP(tokens: Tokens) {
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  static toHTTPList(tokens: Tokens[]) {
    return tokens.map((tokens) => this.toHTTP(tokens));
  }
}
