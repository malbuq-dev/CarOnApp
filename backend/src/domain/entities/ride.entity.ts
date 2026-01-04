import { Money } from "../value-objects/money.value-object";
import { Base } from "./base.entity";
import { User } from "./user.entity";

export class Ride extends Base {
  driver: User;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  totalSeats: number;
  price: Money;

  constructor(
    driver: User,
    origin: string,
    destination: string,
    departureTime: Date,
    arrivalTime: Date,
    totalSeats: number,
    price: Money,
  ) {
    super();
    this.driver = driver;
    this.origin = origin;
    this.destination = destination;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.totalSeats = totalSeats;
    this.price = price;
  }

  
}
