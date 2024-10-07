### Learning Guide: Using Prisma with MongoDB

Prisma recently added support for MongoDB, providing a similar experience to SQL-based databases, but adapted for MongoDB’s document-oriented model. This guide will cover the basics of setting up Prisma with MongoDB, configuring models, and using Prisma Client to perform CRUD operations. We’ll walk through connecting to a MongoDB database in our travel management system, setting up Prisma, and exploring MongoDB-specific features.

---

## 1. Introduction to Prisma and MongoDB

MongoDB is a NoSQL, document-oriented database designed to store and retrieve large amounts of data quickly. Prisma allows developers to leverage MongoDB's benefits within a type-safe, structured environment, similar to how Prisma is used with relational databases.

### Why Use Prisma with MongoDB?
- **Simplified Query Syntax**: Prisma provides a powerful query builder that abstracts away complex MongoDB query syntax.
- **Type Safety**: Prisma auto-generates TypeScript types from the MongoDB schema, ensuring type safety and reducing potential bugs.
- **Unified Experience**: If you're already familiar with Prisma for relational databases, using it with MongoDB provides a unified approach to database management.
- **Prisma Studio**: Prisma’s visualization tool supports MongoDB, making it easier to manage and explore collections and documents.

---

## 2. Installing and Setting up Prisma with MongoDB

### Step 1: Set Up MongoDB
Make sure you have a MongoDB instance running. You can either:
- Set up a local MongoDB instance, or
- Use a managed service like [MongoDB Atlas](https://www.mongodb.com/atlas/database).

Once you have your MongoDB instance, take note of your connection string.

### Step 2: Install Prisma and Dependencies
Navigate to your project directory and install Prisma and the necessary MongoDB dependencies:
```bash
npm install prisma --save-dev
npm install @prisma/client
```

### Step 3: Initialize Prisma for MongoDB
To set up Prisma, run:
```bash
npx prisma init
```

In the `prisma/schema.prisma` file, update the `datasource` configuration to specify MongoDB:
```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["mongoDb"]
}
```

In your `.env` file, add your MongoDB connection string:
```plaintext
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/travel_management?retryWrites=true&w=majority"
```

Replace `username`, `password`, and other details with your actual MongoDB connection information.

---

## 3. Defining MongoDB Models

In MongoDB, Prisma’s model syntax adapts to a document-based schema. Let’s define models for our travel management system.

### Example Models
In the `schema.prisma` file, create models for `User`, `Flight`, and `Booking`:

```prisma
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  email String  @unique
  bookings Booking[]
}

model Flight {
  id         String @id @default(auto()) @map("_id") @db.ObjectId
  origin     String
  destination String
  price      Float
  bookings   Booking[]
}

model Booking {
  id          String @id @default(auto()) @map("_id") @db.ObjectId
  userId      String @db.ObjectId
  flightId    String @db.ObjectId
  bookingDate DateTime @default(now())
  
  user   User   @relation(fields: [userId], references: [id])
  flight Flight @relation(fields: [flightId], references: [id])
}
```

### MongoDB-Specific Notes
- **ObjectId**: MongoDB’s unique identifier for documents is `ObjectId`. In Prisma, use `@db.ObjectId` to specify it as the ID type.
- **@map("_id")**: MongoDB uses `_id` as the primary key field by default. The `@map` attribute maps the `id` field to MongoDB’s `_id`.

---

## 4. Generate the Prisma Client

After defining your models, you need to generate the Prisma Client, which will allow you to interact with MongoDB using Prisma.

Run the following command:
```bash
npx prisma generate
```

The Prisma Client is now ready to be used in your Node.js application.

---

## 5. Creating Database Collections with Prisma Client

With MongoDB, there’s no need for migrations as in SQL databases. The collections will be created automatically based on your Prisma Client queries.

### Step 1: Example CRUD Operations
Let’s perform basic CRUD operations with Prisma Client.

#### Create a New Flight Document
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

#### Find a User’s Bookings
```typescript
async function getUserBookings(userId: string) {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: { flight: true },
  });
  return bookings;
}
```

#### Update a Flight’s Price
```typescript
async function updateFlightPrice(flightId: string, newPrice: number) {
  const updatedFlight = await prisma.flight.update({
    where: { id: flightId },
    data: { price: newPrice },
  });
  return updatedFlight;
}
```

#### Delete a Booking
```typescript
async function deleteBooking(bookingId: string) {
  await prisma.booking.delete({
    where: { id: bookingId },
  });
}
```

Use these functions within your serverless microservices to handle database operations in the travel management system.

---

## 6. Using Prisma Studio with MongoDB

Prisma Studio supports MongoDB, enabling you to visualize and manage your data with ease.

### Step 1: Start Prisma Studio
In your terminal, run:
```bash
npx prisma studio
```

### Step 2: Explore and Manage Collections
Prisma Studio will open in your browser. You can browse collections like `User`, `Flight`, and `Booking`, add new documents, or modify existing ones. This is especially useful for testing and visualizing the data.

---

## Conclusion

Prisma provides a unified experience for interacting with both relational databases and MongoDB. With its intuitive schema format, type-safe Prisma Client, and powerful tools like Prisma Studio, Prisma is a great choice for Node.js and TypeScript projects that rely on MongoDB. This guide covered the essentials of setting up Prisma with MongoDB, defining models, and performing CRUD operations, allowing you to manage your NoSQL data with confidence and efficiency.