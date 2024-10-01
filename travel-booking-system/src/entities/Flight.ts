import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    flight_id!: number;

    @Column()
    origin!: string;

    @Column()
    destination!: string;

    @Column()
    departure_time!: string;


    @Column()
    arrival_time!: string;

    
    @Column("float")
    price!: number;

}