### **SQLite Guide: Subqueries and Nested Queries**

In this guide, we will explore **subqueries** (also known as **nested queries**) using the **travel-booking system** database we've been working on. Subqueries are SQL queries placed inside another query. They are incredibly useful when you need to perform multiple steps to obtain the desired result.

---

### **1. Introduction to Subqueries**

A **subquery** is a query nested inside another query, such as within the `SELECT`, `FROM`, `WHERE`, or `HAVING` clauses. Subqueries are particularly helpful when the result of one query depends on the outcome of another query. You can think of them as breaking down complex problems into smaller steps.

For example, you might want to:
- Find users who have booked the most expensive flight.
- List users who haven’t booked any flights.

Let’s dive into some practical examples!

---

### **2. Types of Subqueries**

Subqueries can be categorized into two types based on their usage:
- **Single-row subqueries**: Return a single value.
- **Multi-row subqueries**: Return multiple values or rows.

---

### **3. Subquery in `SELECT` Clause**

#### **What are we trying to do?**
We want to find out the most expensive flight in the system and show each user’s booked flight along with the price of the most expensive flight.

#### **Query Example:**
```sql
SELECT Users.name, Flights.origin, Flights.destination, Flights.price,
    (SELECT MAX(price) FROM Flights) AS max_price
FROM Bookings
INNER JOIN Users ON Bookings.user_id = Users.user_id
INNER JOIN Flights ON Bookings.flight_id = Flights.flight_id;
```

#### **Explanation:**
- The **subquery** `(SELECT MAX(price) FROM Flights)` retrieves the highest price from the `Flights` table.
- In the outer query, this result is displayed alongside each user’s booking information.
- This allows us to see how each user's booked flight compares with the most expensive flight.

---

### **4. Subquery in `WHERE` Clause**

#### **What are we trying to do?**
We want to find all users who have booked a flight to a destination that has the lowest price available.

#### **Query Example:**
```sql
SELECT Users.name, Flights.origin, Flights.destination, Flights.price
FROM Bookings
INNER JOIN Users ON Bookings.user_id = Users.user_id
INNER JOIN Flights ON Bookings.flight_id = Flights.flight_id
WHERE Flights.price = (SELECT MIN(price) FROM Flights);
```

#### **Explanation:**
- The **subquery** `(SELECT MIN(price) FROM Flights)` retrieves the lowest price from the `Flights` table.
- The outer query filters for flights with that price, listing users who booked the cheapest flight.
  
#### **Why this is useful:**
By nesting a query in the `WHERE` clause, we can filter results based on dynamic conditions, such as finding the user who booked the flight with the lowest fare.

---

### **5. Subquery in `FROM` Clause**

#### **What are we trying to do?**
We want to find the total number of flights each user has booked.

#### **Query Example:**
```sql
SELECT Users.name, flight_count.total_flights
FROM Users
INNER JOIN (
    SELECT user_id, COUNT(*) AS total_flights
    FROM Bookings
    GROUP BY user_id
) AS flight_count ON Users.user_id = flight_count.user_id;
```

#### **Explanation:**
- The **subquery** inside the `FROM` clause `(SELECT user_id, COUNT(*) ... GROUP BY user_id)` counts the number of flights each user has booked.
- This result is then joined with the `Users` table to display each user's name alongside their total number of bookings.
  
#### **Why this is useful:**
Using subqueries in the `FROM` clause allows us to simplify complex aggregations and keep our main query more readable.

---

### **6. Subquery with `EXISTS`**

The `EXISTS` keyword is used to check whether a subquery returns any results. It is often used for **correlated subqueries** where the subquery depends on the outer query.

#### **What are we trying to do?**
We want to find users who haven’t made any bookings yet.

#### **Query Example:**
```sql
SELECT Users.name
FROM Users
WHERE NOT EXISTS (
    SELECT 1
    FROM Bookings
    WHERE Bookings.user_id = Users.user_id
);
```

#### **Explanation:**
- The **subquery** checks if a user exists in the `Bookings` table.
- The `NOT EXISTS` condition filters out users who have bookings, so the outer query returns only those users who haven’t booked any flights.

#### **Why this is useful:**
The `EXISTS` keyword is efficient for checking the presence of records in one table related to another.

---

### **7. Subquery with `IN`**

The `IN` keyword allows us to filter results by comparing a value to a list of values returned by a subquery.

#### **What are we trying to do?**
We want to list all flights that have been booked by users who have email addresses with the domain “example.com”.

#### **Query Example:**
```sql
SELECT origin, destination, price
FROM Flights
WHERE flight_id IN (
    SELECT Bookings.flight_id
    FROM Bookings
    INNER JOIN Users ON Bookings.user_id = Users.user_id
    WHERE Users.email LIKE '%@example.com'
);
```

#### **Explanation:**
- The **subquery** retrieves `flight_id`s from `Bookings` where the user’s email contains “@example.com”.
- The outer query fetches the details of those flights.

#### **Why this is useful:**
The `IN` clause allows us to filter based on a dynamic list of values, which is particularly helpful when working with related tables.

---

### **8. Correlated Subqueries**

A **correlated subquery** is one that references columns from the outer query. Unlike regular subqueries, which are executed once, correlated subqueries are executed row-by-row for each row of the outer query.

#### **What are we trying to do?**
We want to list all users along with the total price of all flights they have booked.

#### **Query Example:**
```sql
SELECT Users.name,
    (SELECT SUM(Flights.price)
     FROM Bookings
     INNER JOIN Flights ON Bookings.flight_id = Flights.flight_id
     WHERE Bookings.user_id = Users.user_id) AS total_spent
FROM Users;
```

#### **Explanation:**
- The **subquery** calculates the total price of flights booked by each user by correlating `Users.user_id` with the `Bookings` table.
- The outer query lists each user and their total spending on flights.

#### **Why this is useful:**
Correlated subqueries provide the flexibility to calculate results dynamically for each row, making them ideal for complex calculations involving multiple tables.

---

### **9. Nested Subqueries**

Sometimes, you may need to nest multiple subqueries within one another.

#### **What are we trying to do?**
We want to find the name of the user who booked the flight with the highest price.

#### **Query Example:**
```sql
SELECT Users.name
FROM Users
WHERE Users.user_id = (
    SELECT Bookings.user_id
    FROM Bookings
    WHERE Bookings.flight_id = (
        SELECT Flights.flight_id
        FROM Flights
        ORDER BY Flights.price DESC
        LIMIT 1
    )
);
```

#### **Explanation:**
- The innermost **subquery** finds the `flight_id` of the flight with the highest price.
- The middle **subquery** retrieves the `user_id` of the user who booked that flight.
- The outer query retrieves the user’s name.

#### **Why this is useful:**
Nested subqueries allow for more complex queries where one calculation or result depends on the outcome of several intermediate steps.

---

### **Real-World Uses of Subqueries**

Subqueries are used in many real-world systems:
- **E-commerce**: Retrieve the highest-selling product or the customer who made the most purchases.
- **Healthcare**: Find the patient with the highest number of appointments.
- **School systems**: Identify the student with the highest GPA or list all students who haven’t enrolled in any classes.