import { Base } from "./base.entity";

export enum BookingStatus {
    DECLINED = 'Declined',
    APPROVED = 'Accepted',
    CANCELED = 'Canceled',
    PENDING = 'Pending',
}

export class Booking extends Base {
    public seatsBooked: number;
    public status: BookingStatus
    public rideId: string;
    public passengerId: string;

    constructor(
        seatsBooked: number,
        rideId: string,
        passengerId: string,
    ) {
        super();
        this.seatsBooked = seatsBooked;
        this.rideId = rideId;
        this.passengerId = passengerId;
        this.status = BookingStatus.PENDING;
    }

    approve() {
        this.status = BookingStatus.APPROVED;
    }

    cancel() {
        this.status = BookingStatus.CANCELED;
    }

    decline() {
        this.status = BookingStatus.DECLINED;
    }

    isApproved(): boolean {
        return this.status === BookingStatus.APPROVED;
    }

    static rehydrate(
        id: string,
        seatsBooked: number,
        status: BookingStatus,
        rideId: string,
        passengerId: string,
    ): Booking {
    const booking = new Booking(
        seatsBooked,
        rideId,
        passengerId,
    );

    booking.id = id;
    booking.status = status;

    return booking;
    }

}