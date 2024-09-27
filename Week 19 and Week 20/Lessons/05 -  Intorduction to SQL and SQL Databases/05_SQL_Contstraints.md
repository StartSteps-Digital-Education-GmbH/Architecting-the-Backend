### **Learning Guide: SQL Constraints in the Travel Booking System**

In this guide, we’ll explore SQL constraints using our travel booking system schema. Constraints enforce rules on the data, ensuring its accuracy and integrity. We'll update the existing tables and introduce a new table where necessary.

---

### **Introduction to SQL Constraints**

SQL constraints are used to define rules for the data in a table. These rules ensure correctness and integrity. Constraints can be applied to a column or the entire table and are enforced automatically whenever a new record is added or modified.

#### **Types of SQL Constraints:**
- **NOT NULL**: Ensures a column cannot have a NULL value.
- **UNIQUE**: Ensures all values in a column are different.
- **PRIMARY KEY**: Uniquely identifies each record in a table.
- **FOREIGN KEY**: Ensures a link between two tables.
- **CHECK**: Ensures that all values in a column satisfy a specific condition.
- **DEFAULT**: Provides a default value for a column when no value is specified.

---

### **Updating the Travel Booking Schema**

We will now use `ALTER TABLE` to modify the existing schema and add constraints where needed:

#### **Updating the Flights Table**

```sql
ALTER TABLE Flights
ADD CHECK (price > 0);
```
- **Explanation**: 
  - This `CHECK` constraint ensures the flight price is always greater than zero.

#### **Updating the Users Table**

```sql
ALTER TABLE Users
ADD COLUMN age INTEGER,
ADD COLUMN membership_level TEXT DEFAULT 'Standard',
ADD CHECK (age >= 18);
```
- **Explanation**: 
  - We've added two new columns: `age` with a `CHECK` constraint to ensure users are at least 18 years old and `membership_level` with a default value of 'Standard'.

---

### **New Table: Payments**

Since we’re introducing a new table for payment details, we’ll create it from scratch:

```sql
CREATE TABLE Payments (
    payment_id INTEGER PRIMARY KEY,
    booking_id INTEGER,
    amount REAL NOT NULL CHECK(amount > 0),
    payment_date TEXT NOT NULL,
    payment_method TEXT CHECK(payment_method IN ('Credit Card', 'Debit Card', 'PayPal')),
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);
```
- **Explanation**: 
  - The `CHECK` constraint ensures that the payment amount is positive, and the payment method is one of the specified values.
  - The `FOREIGN KEY` ensures that every payment references a valid booking.

---

### **Examples of SQL Constraints in Action**

#### 1. **NOT NULL and UNIQUE Constraints**
- Ensure the `name` and `email` are provided, and `email` remains unique.

```sql
INSERT INTO Users (name, email, age)
VALUES ('Sarah Connor', 'sconnor@example.com', 28);

-- Error: Attempting to insert a user without an email
INSERT INTO Users (name, age)
VALUES ('John Doe', 25);  -- Fails due to NOT NULL constraint on email
```

#### 2. **CHECK Constraint**
- The `price` of a flight must be greater than 0.

```sql
-- Valid Flight Insertion
INSERT INTO Flights (origin, destination, departure_time, arrival_time, price)
VALUES ('New York', 'Los Angeles', '2024-12-01 08:00', '2024-12-01 11:00', 300);

-- Error: Attempting to insert a flight with price 0
INSERT INTO Flights (origin, destination, departure_time, arrival_time, price)
VALUES ('New York', 'Chicago', '2024-12-02 09:00', '2024-12-02 11:00', 0);  -- Fails
```

#### 3. **DEFAULT Constraint**
- If the `membership_level` is not provided, it defaults to 'Standard'.

```sql
INSERT INTO Users (name, email, age)
VALUES ('Jane Doe', 'jdoe@example.com', 32);

-- Query result shows 'Standard' as the membership_level for Jane Doe
SELECT * FROM Users WHERE email = 'jdoe@example.com';
```

#### 4. **FOREIGN KEY Constraint**
- A booking must reference a valid `user_id` and `flight_id`.

```sql
-- Valid Booking Insertion
INSERT INTO Bookings (user_id, flight_id, booking_date)
VALUES (1, 1, '2024-09-25');

-- Error: Attempting to insert a booking with an invalid user
INSERT INTO Bookings (user_id, flight_id, booking_date)
VALUES (99, 1, '2024-09-25');  -- Fails due to foreign key constraint
```

#### 5. **CHECK Constraint with Enumerated Values**
- The payment method must be one of the allowed methods.

```sql
-- Valid Payment Insertion
INSERT INTO Payments (booking_id, amount, payment_date, payment_method)
VALUES (1, 200, '2024-09-26', 'Credit Card');

-- Error: Attempting to insert an invalid payment method
INSERT INTO Payments (booking_id, amount, payment_date, payment_method)
VALUES (1, 150, '2024-09-27', 'Cash');  -- Fails
```

---

### **Conclusion**

Using SQL constraints helps enforce rules that maintain data integrity in our travel booking system. We’ve successfully updated the `Flights` and `Users` tables, introduced a new `Payments` table, and explored how constraints such as `NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`, and `FOREIGN KEY` work in real-world scenarios.