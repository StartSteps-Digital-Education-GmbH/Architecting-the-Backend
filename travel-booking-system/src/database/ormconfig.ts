import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Flight } from "../entities/Flight.js";
import { Booking } from "../entities/Booking.js";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env?.DATABASE_PORT || '5432') ,
  username: process.env.DATABASE_USERNAME || "travel_user",
  password: process.env.DATABASE_PASSWORD || "travel_user",
  database: process.env.DATABASE_NAME || "travel_management_system",
  synchronize: true,
  logging: true,
  entities: [User, Flight, Booking]
});