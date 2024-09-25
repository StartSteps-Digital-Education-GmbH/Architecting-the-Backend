## **SQLite Guide: Building a Travel Booking System**

### **1. Introduction to SQLite**
   - **What is SQLite?**
     - SQLite is a simple, serverless, and lightweight database engine that stores data in a single file.
     - It’s perfect for small to medium applications and is commonly used in mobile apps and embedded systems.

   - **Why are we using SQLite?**
     - It’s easy to set up, doesn’t need a server, and works well for learning and prototyping databases.

---

### **2. Setting Up the Travel Booking System**

In this lesson, we’ll start building a **travel booking system** using SQLite. Our system will store information about flights, customers, and bookings. We’ll begin with the **Flights** and **Users** tables and learn how to manage data in them using SQL.

---

### **3. Installing and Setting Up SQLite**

#### **Step 1: Install SQLite**
   - Download SQLite from the [official website](https://www.sqlite.org/download.html).
   - For macOS or Linux, use your terminal:
     ```bash
     sudo apt-get install sqlite3
     ```
   - For Windows, download the binaries and add SQLite to your system PATH.

#### **Step 2: Create an SQL File in VSCode**
   1. Open **VSCode** and create a new file called `travel-booking-system.sql`.
   2. We will use this file to create and manage our SQLite database.

---

### **4. Creating the Flights and Users Tables**

#### **Step 1: Defining the Flights Table**

In our travel booking system, we need to store information about flights. Each flight will have the following columns:

   - **flight_id**: A unique ID for each flight.
   - **origin**: The departure city.
   - **destination**: The arrival city.
   - **departure_time**: When the flight leaves.
   - **arrival_time**: When the flight arrives.
   - **price**: The cost of the flight.

Add this to your `travel-booking-system.sql` file:
```sql
-- Create Flights table
CREATE TABLE Flights (
    flight_id INTEGER PRIMARY KEY,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    departure_time TEXT NOT NULL,
    arrival_time TEXT NOT NULL,
    price REAL NOT NULL
);
```

#### **Step 2: Defining the Users Table**

To manage customers who book flights, we need a **Users** table. This will have:

   - **user_id**: A unique ID for each user.
   - **name**: The user's full name.
   - **email**: The user’s email address.

Add this to your SQL file:
```sql
-- Create Users table
CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);
```

#### **Step 3: Running the SQL File**

1. In your terminal, open SQLite and create the database:
   ```bash
   sqlite3 travel-booking-system.db
   ```
2. Use the `.read` command to execute the SQL file and create the tables:
   ```bash
   .read travel-booking-system.sql
   ```

---

### **5. Inserting Data into Our Tables**

Now that the tables are set up, let’s add some data to them.

#### **Step 1: Adding Flights**

Let’s insert some sample flight data to populate the `Flights` table.

```sql
-- Insert data into Flights table
INSERT INTO Flights (origin, destination, departure_time, arrival_time, price) 
VALUES ('New York', 'London', '2024-10-01 08:00', '2024-10-01 20:00', 500.00);

INSERT INTO Flights (origin, destination, departure_time, arrival_time, price) 
VALUES ('Paris', 'Berlin', '2024-10-05 09:30', '2024-10-05 11:45', 300.00);
```

#### **Step 2: Adding Users**

Next, let’s add users who will be booking these flights.

```sql
-- Insert data into Users table
INSERT INTO Users (name, email) 
VALUES ('Alice Johnson', 'alice.j@example.com');

INSERT INTO Users (name, email) 
VALUES ('Bob Smith', 'bob.s@example.com');
```

#### **Step 3: Querying the Data**

To check the data, you can use a `SELECT` query. For example, to see all flights:

```sql
SELECT * FROM Flights;
```

And for users:

```sql
SELECT * FROM Users;
```

---

### **6. Updating Data**

Sometimes, we need to update the data in our tables. Let’s say the price of a flight changes.

#### **Example: Updating Flight Price**

```sql
-- Update the price of a flight
UPDATE Flights 
SET price = 550.00 
WHERE flight_id = 1;
```

This query updates the price of the flight with `flight_id = 1` to `$550.00`.

#### **Example: Changing a User’s Email**

If a user updates their email address:

```sql
-- Update a user's email
UPDATE Users 
SET email = 'alice.new@example.com' 
WHERE user_id = 1;
```

---

### **7. Deleting Data**

You may need to delete records from your database when they are no longer needed. For example, if a user cancels their account or a flight is no longer available.

#### **Example: Deleting a Flight**

```sql
-- Delete a flight from the Flights table
DELETE FROM Flights 
WHERE flight_id = 2;
```

This query deletes the flight with `flight_id = 2`.

#### **Example: Deleting a User**

```sql
-- Delete a user from the Users table
DELETE FROM Users 
WHERE user_id = 2;
```

---

### **8. Next Steps: Expanding the Database**

Now that you’ve created the basic structure for a travel booking system, including flights and users, we’ll continue building this in the next guide. We’ll add new tables for bookings, handle relationships between tables, and explore more complex SQL queries like **joins**.

---

### **Conclusion**
   - You’ve successfully set up a basic travel booking system using SQLite.
   - You’ve learned how to create tables, insert, update, and delete data.
   - In the next lessons, we’ll explore more advanced database concepts and extend this system with additional features.