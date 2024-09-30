### SQL and TypeScript: A Step-by-Step Guide with SQLite, TypeORM, and Express

In this guide, we will walk through how to set up a TypeScript project that uses SQL (specifically SQLite) with TypeORM, and how to build a RESTful API with Express. The guide covers best practices for integrating SQL with TypeScript, focusing on maintainability, type safety, and scalability.

#### Step 1: Setting Up TypeScript

1. **Install Node.js and TypeScript**  
   If you don't have Node.js installed, you can download it from the [official website](https://nodejs.org/en/download/).

   Install TypeScript globally:
   ```bash
   npm install -g typescript
   ```

2. **Create a New Project Folder**
   ```bash
   mkdir typescript-sql-api
   cd typescript-sql-api
   ```

3. **Initialize `package.json`**
   ```bash
   npm init -y
   ```

4. **Install Development Dependencies**
   ```bash
   npm install typescript ts-node @types/node --save-dev
   ```

#### Step 2: Set Up TypeORM with SQLite

1. **Install TypeORM and SQLite3**
   ```bash
   npm install typeorm sqlite3 reflect-metadata
   ```

2. **Create a Database Folder**
   Create a `src/database` folder where you will keep your database connection settings.

3. **Define `ormconfig.ts` for Database Connection**
   Inside `src/database/ormconfig.ts`, add the following code:
   ```typescript
   import { DataSource } from "typeorm";
   import { Flight } from "../entities/Flight";
   import { User } from "../entities/User";
   import { Booking } from "../entities/Booking";

   export const AppDataSource = new DataSource({
     type: "sqlite",
     database: "./src/database/database.sqlite",
     synchronize: true,
     logging: true,
     entities: [Flight, User, Booking],
   });
   ```

#### Step 3: Defining Models

1. **Flight Model (`src/entities/Flight.ts`)**:
   ```typescript
   import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

   @Entity()
   export class Flight {
     @PrimaryGeneratedColumn()
     flight_id: number;

     @Column()
     origin: string;

     @Column()
     destination: string;

     @Column()
     departure_time: string;

     @Column()
     arrival_time: string;

     @Column("float")
     price: number;
   }
   ```

2. **User Model (`src/entities/User.ts`)**:
   ```typescript
   import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

   @Entity()
   export class User {
     @PrimaryGeneratedColumn()
     user_id: number;

     @Column()
     name: string;

     @Column({ unique: true })
     email: string;
   }
   ```

3. **Booking Model (`src/entities/Booking.ts`)**:
   ```typescript
   import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
   import { User } from "./User";
   import { Flight } from "./Flight";

   @Entity()
   export class Booking {
     @PrimaryGeneratedColumn()
     booking_id: number;

     @ManyToOne(() => User, (user) => user.bookings)
     user: User;

     @ManyToOne(() => Flight, (flight) => flight.bookings)
     flight: Flight;

     @Column()
     booking_date: string;
   }
   ```

#### Step 4: Connecting to the Database

1. **Initialize the Connection**
   Create `src/database/index.ts` to initialize the database connection:
   ```typescript
   import "reflect-metadata";
   import { AppDataSource } from "./ormconfig";

   AppDataSource.initialize()
     .then(() => {
       console.log("Database connection established");
     })
     .catch((error) => console.log("Error: ", error));
   ```

2. **Run the Database Connection**
   To test the connection, add the following to your `src/index.ts` file:
   ```typescript
   import "./database";
   ```

   Run the project:
   ```bash
   ts-node src/index.ts
   ```

#### Step 5: Running Queries

You can now use TypeORM's `repository` methods to query the database.

Example: Fetching all flights:
```typescript
import { AppDataSource } from "./database/ormconfig";
import { Flight } from "./entities/Flight";

const flightRepository = AppDataSource.getRepository(Flight);

async function getAllFlights() {
  const flights = await flightRepository.find();
  console.log(flights);
}

getAllFlights();
```

#### Step 6: Creating a RESTful API with Express

1. **Install Express and Types**
   ```bash
   npm install express
   npm install @types/express --save-dev
   ```

2. **Create an Express Server**
   Create `src/server.ts`:
   ```typescript
   import express from "express";
   import { AppDataSource } from "./database/ormconfig";
   import { Flight } from "./entities/Flight";

   const app = express();
   app.use(express.json());

   // Get all flights
   app.get("/flights", async (req, res) => {
     const flights = await AppDataSource.getRepository(Flight).find();
     res.json(flights);
   });

   const PORT = 3000;
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   ```

3. **Run the Server**
   To start the server:
   ```bash
   ts-node src/server.ts
   ```

Now you have a working REST API with TypeScript, SQLite, and TypeORM!
