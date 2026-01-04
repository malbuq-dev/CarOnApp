import { Money } from "../value-objects/money.value-object";
import { Base } from "./base.entity";
import { User } from "./user.entity";

export interface RideProps {
  driverId: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  totalSeats: number;
  price: Money;
  createdAt?: Date;
  updatedAt?: Date;
}

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

    update(props: Partial<RideProps>) {
      if (props.origin !== undefined) {
        this.origin = props.origin;
      }

      if (props.destination !== undefined) {
        this.destination = props.destination;
      }

      if (props.departureTime !== undefined) {
        this.departureTime = new Date(props.departureTime);
      }

      if (props.arrivalTime !== undefined) {
        this.arrivalTime = new Date(props.arrivalTime);
      }

      if (props.totalSeats !== undefined) {
        this.totalSeats = props.totalSeats;
      }

      if (props.price !== undefined) {
        this.price = props.price;
      }
  }
  
}
