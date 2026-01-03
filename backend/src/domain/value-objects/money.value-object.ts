export class Money {
  private constructor(private readonly cents: number) {}

  static fromDecimal(value: string): Money {
    const parsed = Number(value);

    if (Number.isNaN(parsed)) {
      throw new Error('Valor inválido');
    }

    return new Money(Math.round(parsed * 100));
  }

  static fromCents(cents: number): Money {
    if (!Number.isInteger(cents) || cents < 0) {
      throw new Error('Valor inválido');
    }

    return new Money(cents);
  }

  toCents(): number {
    return this.cents;
  }

  toDecimal(): string {
    return (this.cents / 100).toFixed(2);
  }
}
