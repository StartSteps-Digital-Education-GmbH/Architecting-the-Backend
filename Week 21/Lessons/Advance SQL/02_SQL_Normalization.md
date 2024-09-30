### **SQL Normalization: A Step-by-Step Guide**

#### **What is SQL Normalization?**
Normalization is the process of organizing data to minimize redundancy and ensure data integrity by dividing large tables into smaller, related tables. Each table contains only one type of related data.


**Key Objectives:**
- Eliminate redundant data.
- Ensure data dependencies are logical.
- Simplify database maintenance and improve query performance.


#### **Normal Forms:**
1. **First Normal Form (1NF)**: No repeating groups, all columns contain atomic values.
2. **Second Normal Form (2NF)**: No partial dependencies—non-key attributes must depend on the entire primary key.
3. **Third Normal Form (3NF)**: No transitive dependencies—non-key attributes should not depend on other non-key attributes.

---

### **Benefits of Normalization:**
- **Reduces Data Redundancy**: Eliminates duplicate data and ensures consistency.
- **Improves Data Integrity**: Enforces data constraints and relationships.
- **Simplifies Queries and Updates**: Makes queries simpler by reducing the complexity of the database schema.
- **Enhances Performance**: Streamlines data retrieval and update operations.

---

### **Step-by-Step Normalization Using the Travel Booking System Scenario**

We’ll normalize the following table step by step:

```sql
CREATE TABLE TravelBooking (
    booking_id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    flight_details TEXT NOT NULL,
    booking_date TEXT NOT NULL,
    amount_paid REAL NOT NULL
);
```

**Sample Data:**

| booking_id | customer_name | customer_email        | flight_details                     | booking_date | amount_paid |
|------------|----------------|-----------------------|------------------------------------|--------------|-------------|
| 1          | John Doe       | john.doe@email.com    | NYC-LAX, 2024-10-01, 08:00 AM      | 2024-09-15   | 350         |
| 2          | Jane Smith     | jane.smith@email.com  | NYC-LAX, 2024-10-01, 08:00 AM      | 2024-09-16   | 350         |
| 3          | John Doe       | john.doe@email.com    | NYC-MIA, 2024-10-05, 09:00 AM      | 2024-09-17   | 200         |


**Issues:**
- Customer details are repeated for each booking.
- Flight details are not normalized.
- No clear relationships between data elements.

#### **Step 1: First Normal Form (1NF)**

**Problem:** The `flight_details` column contains multiple pieces of information (origin, destination, departure time), violating 1NF.

**Solution:** Split the `flight_details` into atomic columns.

```sql
CREATE TABLE TravelBooking_1NF (
    booking_id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    departure_time TEXT NOT NULL,
    booking_date TEXT NOT NULL,
    amount_paid REAL NOT NULL
);
```

**Data After 1NF:**

| booking_id | customer_name | customer_email        | origin | destination | departure_time  | booking_date | amount_paid |
|------------|----------------|-----------------------|--------|-------------|-----------------|--------------|-------------|
| 1          | John Doe       | john.doe@email.com    | NYC    | LAX         | 2024-10-01 08:00| 2024-09-15   | 350         |
| 2          | Jane Smith     | jane.smith@email.com  | NYC    | LAX         | 2024-10-01 08:00| 2024-09-16   | 350         |
| 3          | John Doe       | john.doe@email.com    | NYC    | MIA         | 2024-10-05 09:00| 2024-09-17   | 200         |

**Benefit:** Data is now atomic, and each piece of information is stored in its own column.

---

#### **Step 2: Second Normal Form (2NF)**

**Problem:** Customer information is repeated across multiple bookings, violating 2NF.

**Solution:** Separate the customer and flight information into individual tables and create relationships.

```sql
CREATE TABLE Customers (
    customer_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE Flights (
    flight_id INTEGER PRIMARY KEY,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    departure_time TEXT NOT NULL
);

CREATE TABLE TravelBooking_2NF (
    booking_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    flight_id INTEGER,
    booking_date TEXT NOT NULL,
    amount_paid REAL NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (flight_id) REFERENCES Flights(flight_id)
);
```

**Data After 2NF:**

**Customers Table:**

| customer_id | name        | email                |
|-------------|-------------|----------------------|
| 1           | John Doe    | john.doe@email.com   |
| 2           | Jane Smith  | jane.smith@email.com |

**Flights Table:**

| flight_id | origin | destination | departure_time  |
|-----------|--------|-------------|-----------------|
| 1         | NYC    | LAX         | 2024-10-01 08:00|
| 2         | NYC    | MIA         | 2024-10-05 09:00|

**TravelBooking_2NF Table:**

| booking_id | customer_id | flight_id | booking_date | amount_paid |
|------------|-------------|-----------|--------------|-------------|
| 1          | 1           | 1         | 2024-09-15   | 350         |
| 2          | 2           | 1         | 2024-09-16   | 350         |
| 3          | 1           | 2         | 2024-09-17   | 200         |

**Benefit:** Customer and flight details are now stored separately, reducing redundancy.

---

#### **Step 3: Third Normal Form (3NF)**

**Problem:** The `amount_paid` is related to the booking and flight, but we may want to store additional payment information (e.g., payment method, payment date). This introduces potential transitive dependencies.

**Solution:** Separate the payment information into a new `Payments` table.

```sql
CREATE TABLE Payments (
    payment_id INTEGER PRIMARY KEY,
    booking_id INTEGER,
    amount REAL NOT NULL,
    payment_date TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES TravelBooking_2NF(booking_id)
);
```

**Data After 3NF:**

**Payments Table:**

| payment_id | booking_id | amount | payment_date | payment_method |
|------------|------------|--------|--------------|----------------|
| 1          | 1          | 350    | 2024-09-15   | Credit Card    |
| 2          | 2          | 350    | 2024-09-16   | PayPal         |
| 3          | 3          | 200    | 2024-09-17   | Debit Card     |

**Benefit:** The `Payments` table allows us to store additional information related to payments and avoids redundancy in the `TravelBooking` table.

---

### **Benefits of Each Step**

1. **First Normal Form (1NF)**: Atomic values make the data structure clearer and avoid combining multiple pieces of information in a single column.
2. **Second Normal Form (2NF)**: Separating customers and flights reduces data redundancy and ensures that changes (like a customer's email) only need to be made in one place.
3. **Third Normal Form (3NF)**: Isolating payment information ensures that related details (e.g., payment method) are stored independently of other booking information, improving flexibility and data integrity.
