### *Transaction Control Language**

### 1. **Introduction to Transactions:**
   A transaction in SQL is a unit of work that either completes fully or not at all. Transactions ensure the integrity of data during operations.

   - **Example Scenario:** A user books a flight and makes a payment. Both operations should succeed together (booking and payment) or fail together (no booking, no payment).

### 2. **ACID Properties:**
   ACID stands for **Atomicity, Consistency, Isolation, and Durability**, which are essential properties of any transaction.

   - **Atomicity:** Ensures that all parts of a transaction are completed successfully, or none of them are. If something fails, everything is rolled back.
     - *Example:* If a booking fails, the payment should not be processed.

   - **Consistency:** Ensures that a transaction leaves the database in a consistent state before and after it completes.
     - *Example:* Booking a flight should only be allowed if there is availability for that flight, ensuring consistent data.

   - **Isolation:** Transactions are isolated from each other, ensuring that concurrent operations do not interfere.
     - *Example:* If two users try to book the last available seat on the same flight, the system should handle it so only one succeeds.

   - **Durability:** Once a transaction is committed, it will remain so, even in the event of a system crash.
     - *Example:* Once a payment is confirmed and the booking is successful, this data will be stored permanently.

### 3. **TCL Commands:**

#### **COMMIT:**
   - Commits a transaction, making all its changes permanent.
   - Example: After inserting a new booking and corresponding payment, the changes will be committed to the database.

```sql
BEGIN TRANSACTION;
INSERT INTO Bookings (user_id, flight_id, booking_date)
VALUES (1, 2, '2024-09-30');

INSERT INTO Payments (booking_id, amount, payment_date, payment_method)
VALUES (LAST_INSERT_ROWID(), 250.00, '2024-09-30', 'Credit Card');

COMMIT;
```

#### **ROLLBACK:**
   - Undoes a transaction, reverting all changes.
   - Example: If the payment fails, the booking should also be rolled back.

```sql
BEGIN TRANSACTION;
INSERT INTO Bookings (user_id, flight_id, booking_date)
VALUES (1, 2, '2024-09-30');

-- Payment fails, rollback entire transaction
ROLLBACK;
```

#### **SAVEPOINT:**
   - Creates a point within a transaction to which you can later roll back.
   - Example: Creating a savepoint before payment processing, so you can roll back only that step if it fails.

```sql
BEGIN TRANSACTION;
INSERT INTO Bookings (user_id, flight_id, booking_date)
VALUES (1, 2, '2024-09-30');

SAVEPOINT before_payment;

-- Try processing payment
INSERT INTO Payments (booking_id, amount, payment_date, payment_method)
VALUES (LAST_INSERT_ROWID(), 250.00, '2024-09-30', 'Credit Card');

-- If payment fails, rollback to the savepoint
ROLLBACK TO before_payment;

COMMIT;
```

### 4. **Use Case Scenario in Travel Booking System:**

Let's consider a user booking a flight, and we will apply the ACID properties step by step.

- **Atomicity:** Both the `Bookings` and `Payments` records must be successfully created. If one fails, neither should succeed.
- **Consistency:** The flight should not be overbooked; it should only be booked if available.
- **Isolation:** Multiple users trying to book the same flight should not interfere with each other.
- **Durability:** Once the transaction is committed, the booking and payment data must be saved permanently.