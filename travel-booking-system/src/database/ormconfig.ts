import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/database.sqlite",
  synchronize: true,
  logging: true,
  entities: [User]
});