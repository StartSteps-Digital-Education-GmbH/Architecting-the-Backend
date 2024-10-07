### Learning Guide: Introduction to Prisma with PostgreSQL

Prisma is a modern, open-source ORM that simplifies database management in Node.js and TypeScript applications. It allows developers to interact with databases using an auto-generated, type-safe query builder, making it easier to manage database schemas, run migrations, and perform CRUD operations. In this guide, we’ll explore Prisma’s benefits, set it up with a PostgreSQL database in our travel management system serverless microservices, and learn how to use its features effectively.

---

## 1. Introduction to Prisma and Its Benefits

**Prisma** offers several advantages:
- **Type Safety**: Prisma automatically generates TypeScript types based on your database schema, reducing the chances of runtime errors.
- **Schema Management**: Prisma's intuitive schema definition format makes it easy to manage your database structure, handle relationships, and track changes.
- **Prisma Migrate**: This feature allows you to easily create and apply database migrations to keep your database in sync with your Prisma schema.
- **Prisma Client**: The auto-generated client provides a convenient and type-safe way to interact with the database.
- **Prisma Studio**: A powerful visual interface for exploring and managing your data directly from a web interface.

---

## 2. Installing and Setting up Prisma with the Travel Management System

To use Prisma in your travel management system, we’ll need to install Prisma, configure it, and set up a PostgreSQL database.

### Step 1: Install Prisma CLI and Other Dependencies
First, navigate to your project directory and install Prisma CLI and PostgreSQL dependencies:
```bash
npm install prisma --save-dev
npm install @prisma/client
```

### Step 2: Initialize Prisma
Run the following command to initialize Prisma in your project. This creates a `prisma` folder with a `schema.prisma` file:
```bash
npx prisma init
```

### Step 3: Configure the Database Connection
In the `prisma/schema.prisma` file, update the `datasource` section with your PostgreSQL connection string:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then, in your `.env` file, set the `DATABASE_URL`:
```plaintext
DATABASE_URL="postgresql://username:password@localhost:5432/travel_management"
```

Make sure to replace `username`, `password`, and other details with your actual PostgreSQL connection information.

---

## 3. Creating Models for Flights, Users, and Bookings

Now, let’s define the models in the `schema.prisma` file. These models represent the tables in our travel management system.

### Step 1: Define the Models
```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  bookings  Booking[]
}

model Flight {
  id           Int       @id @default(autoincrement())
  origin       String
  destination  String
  price        Float
  bookings     Booking[]
}

model Booking {
  id         Int       @id @default(autoincrement())
  userId     Int
  flightId   Int
  bookingDate DateTime @default(now())

  user   User   @relation(fields: [userId], references: [id])
  flight Flight @relation(fields: [flightId], references: [id])
}
```

### Step 2: Run Prisma Format
Format the schema to ensure consistency:
```bash
npx prisma format
```

---

## 4. Create Database Tables with Prisma Migrate

With our models defined, we can now create the corresponding tables in the database using Prisma Migrate.

### Step 1: Create the Migration
To create a new migration and apply it to the database, run:
```bash
npx prisma migrate dev --name init
```

Prisma will prompt you to create the initial migration, and then it will create the tables in your PostgreSQL database based on your model definitions.

### Step 2: Verify the Database Schema
You can verify that the tables have been created by checking the database directly or by using Prisma Studio.

---

## 5. Querying the Database with Prisma Client

Prisma Client is an auto-generated library that allows you to perform database operations. Let’s update our CRUD operations in the travel management system’s API using Prisma Client.

### Step 1: Generate Prisma Client
Run the following command to generate the Prisma Client based on your Prisma schema:
```bash
npx prisma generate
```

### Step 2: Update CRUD Operations

#### Example: Creating a New Flight
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createFlight(origin: string, destination: string, price: number) {
  const newFlight = await prisma.flight.create({
    data: {
      origin,
      destination,
      price,
    },
  });
  return newFlight;
}
```

#### Example: Fetching User Bookings
```typescript
async function getUserBookings(userId: number) {
  const userBookings = await prisma.booking.findMany({
    where: { userId },
    include: {
      flight: true,
    },
  });
  return userBookings;
}
```

#### Example: Updating a Flight
```typescript
async function updateFlightPrice(flightId: number, newPrice: number) {
  const updatedFlight = await prisma.flight.update({
    where: { id: flightId },
    data: { price: newPrice },
  });
  return updatedFlight;
}
```

#### Example: Deleting a Booking
```typescript
async function deleteBooking(bookingId: number) {
  await prisma.booking.delete({
    where: { id: bookingId },
  });
}
```

Update your travel management system’s API endpoints to use these functions for interacting with the PostgreSQL database through Prisma.

---

## 6. Installing and Using Prisma Studio

Prisma Studio is a visual tool that allows you to explore and manage your data from a web-based interface.

### Step 1: Start Prisma Studio
In your terminal, run the following command to open Prisma Studio:
```bash
npx prisma studio
```

### Step 2: Explore the Database
Once Prisma Studio is running, you can navigate through your `Users`, `Flights`, and `Bookings` tables, view the data, and make changes as needed. This is particularly helpful for development and debugging, as it provides a clear view of the data without requiring direct SQL queries.

---

## Conclusion
Prisma simplifies database interactions and offers a type-safe way to manage database schemas, migrations, and queries. By integrating it into your travel management system’s serverless microservices with PostgreSQL, you can manage the database with ease, update the API’s CRUD operations to use Prisma Client, and leverage Prisma Studio for streamlined data management. This guide covers the essentials for setting up and using Prisma, allowing you to build a robust and maintainable application.