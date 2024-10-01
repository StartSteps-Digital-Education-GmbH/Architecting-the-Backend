//one to many: one user can create many bookings
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User.js";
import { Flight } from "./Flight.js";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    booking_id!: number;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Flight)
    flight!: Flight;

    @Column()
    booking_date!: string;
}