import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Flight } from "../entities/Flight.js";
import { Booking } from "../entities/Booking.js";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "travel_user",
  password: "travel_user",
  database: "travel_management_system",
  synchronize: true,
  logging: true,
  entities: [User, Flight, Booking]
});