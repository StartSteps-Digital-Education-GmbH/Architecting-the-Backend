## **SQLite Guide: Table Joins**

### **Introduction to SQL Joins**

In relational databases, **joins** are used to combine data from two or more tables based on a related column between them. This related column is often a **primary key** (a unique identifier for each row in a table) or a **foreign key** (a column in one table that references the primary key of another table).

In our travel-booking-system database, we have several related tables:
- **Users**: Stores user information such as name and email.
- **Flights**: Contains details of available flights, such as origin, destination, and price.
- **Bookings**: Links users to the flights they have booked, establishing the relationship between these two tables.

Joins help us answer questions like: 
- "Which users booked a flight to a specific destination?"
- "How many flights has each user booked?"
  
By using different types of joins, we can extract meaningful information from these related tables.

---

### **1. INNER JOIN**

#### **Explanation:**
An **INNER JOIN** returns only the rows that have matching values in both tables. For example, if we want to list all users who have booked a flight, we’ll join the `Users` table with the `Bookings` and `Flights` tables using the matching foreign keys.

#### **What are we trying to do?**
We want to list all users, their booked flights, and the booking date.

#### **Query Example:**
```sql
SELECT Users.name, Flights.origin, Flights.destination, Flights.price, Bookings.booking_date
FROM Bookings
INNER JOIN Users ON Bookings.user_id = Users.user_id
INNER JOIN Flights ON Bookings.flight_id = Flights.flight_id;
```

#### **Explanation:**
- **Users.name**: Retrieves the user’s name from the `Users` table.
- **Flights.origin, Flights.destination, Flights.price**: Fetches flight details (origin, destination, price) from the `Flights` table.
- **Bookings.booking_date**: Shows when the user booked the flight from the `Bookings` table.

This query lists users and their corresponding flights only if they have made a booking. If a user hasn’t booked a flight, they won’t appear in the result.

#### **Real-world example:**  
In a **library system**, if you want to list all books along with their authors, you would use an INNER JOIN to match books that have an associated author.

---

### **2. LEFT JOIN (or LEFT OUTER JOIN)**

#### **Explanation:**
A **LEFT JOIN** returns all rows from the left table (in this case, `Users`), and the matched rows from the right table (`Bookings` and `Flights`). If there is no match, the result will contain NULL for the columns from the right table.

#### **What are we trying to do?**
We want to list all users, even those who haven’t booked any flights yet.

#### **Query Example:**
```sql
SELECT Users.name, Bookings.booking_date, Flights.origin, Flights.destination
FROM Users
LEFT JOIN Bookings ON Users.user_id = Bookings.user_id
LEFT JOIN Flights ON Bookings.flight_id = Flights.flight_id;
```

#### **Explanation:**
- **Users.name**: Retrieves the user’s name from the `Users` table.
- **Bookings.booking_date**: Shows the booking date if the user has made a booking; otherwise, it will be NULL.
- **Flights.origin, Flights.destination**: Flight details (origin, destination) are fetched from the `Flights` table if a booking exists; otherwise, they will be NULL.

This query ensures that all users are listed, regardless of whether they have booked a flight. This is useful for identifying users who haven’t made any bookings yet.

#### **Real-world example:**  
In a **university** system, if you want to list all students and their enrollments, you would use a LEFT JOIN. Students who haven’t enrolled in any courses will still be listed, but their course details will show as NULL.

---

### **3. CROSS JOIN**

#### **Explanation:**
A **CROSS JOIN** returns the Cartesian product of two tables, meaning it combines every row from the first table with every row from the second table. It doesn't require any matching keys between tables.

#### **What are we trying to do?**
We want to see all possible combinations of users and flights, regardless of whether the user has booked any flights.

#### **Query Example:**
```sql
SELECT Users.name, Flights.origin, Flights.destination
FROM Users
CROSS JOIN Flights;
```

#### **Explanation:**
- **Users.name**: Retrieves the user’s name.
- **Flights.origin, Flights.destination**: Shows all possible flight details.

This query generates a list that includes every user paired with every available flight. This is often useful for generating reports or analyzing all potential options.

#### **Real-world example:**  
In a **restaurant** management system, a CROSS JOIN can show all combinations of customers and menu items to create a promotional list of every possible customer order.

---

### **4. LEFT JOIN with Filtering**

#### **Explanation:**
Combining a **LEFT JOIN** with a filtering condition allows you to narrow down the results. For example, you can use this approach to identify users who may have incomplete data but meet a specific criterion.

#### **What are we trying to do?**
We want to find all users and their bookings where the destination is ‘Chicago,’ including users who haven’t booked a flight.

#### **Query Example:**
```sql
SELECT Users.name, Flights.origin, Flights.destination
FROM Users
LEFT JOIN Bookings ON Users.user_id = Bookings.user_id
LEFT JOIN Flights ON Bookings.flight_id = Flights.flight_id
WHERE Flights.destination = 'Chicago' OR Flights.destination IS NULL;
```

#### **Explanation:**
- **Flights.destination = 'Chicago'**: Filters the result to only include bookings to Chicago.
- **Flights.destination IS NULL**: Ensures users without any bookings are still listed.

This query combines a filter condition with a LEFT JOIN to display users who either booked a flight to Chicago or haven’t booked any flight.

#### **Real-world example:**  
In a **job application** system, you might want to find all applicants who applied to the `Engineering` department but still list all applicants, even those who haven’t applied for any jobs yet.

---

### **5. INNER JOIN with Aggregation**

#### **Explanation:**
By combining an **INNER JOIN** with aggregate functions like `SUM()`, `AVG()`, etc., we can compute summary information based on the related data.

#### **What are we trying to do?**
We want to calculate the total amount each user has spent on booking flights.

#### **Query Example:**
```sql
SELECT Users.name, SUM(Flights.price) AS total_spending
FROM Bookings
INNER JOIN Users ON Bookings.user_id = Users.user_id
INNER JOIN Flights ON Bookings.flight_id = Flights.flight_id
GROUP BY Users.name;
```

#### **Explanation:**
- **SUM(Flights.price)**: Calculates the total amount spent by each user on flights.
- **GROUP BY Users.name**: Groups the results by each user’s name to show individual totals.

This query helps us summarize the total flight spending for each user, which is useful for customer analytics.

#### **Real-world example:**  
In a **sales** system, combining an INNER JOIN with `SUM()` can help calculate the total revenue generated by each product.

---

### **More Joins Examples in Real Systems**

- **E-commerce**: Combine `Customers`, `Orders`, and `Products` tables to track customer purchases and generate personalized recommendations.
- **School Management**: Use joins to analyze students' course enrollments and performance across subjects.
- **Healthcare**: Link `Patients`, `Doctors`, and `Appointments` to manage scheduling and patient care efficiently.