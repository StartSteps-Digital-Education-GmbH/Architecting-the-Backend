import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Flight } from "../entities/Flight.js";
import { Booking } from "../entities/Booking.js";
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/database.db",
  synchronize: true,
  logging: true,
  entities: [User, Flight, Booking]
});