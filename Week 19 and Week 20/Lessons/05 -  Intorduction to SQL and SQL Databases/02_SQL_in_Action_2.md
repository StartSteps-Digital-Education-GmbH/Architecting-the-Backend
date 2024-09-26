## **SQLite Guide: Working with Aggregation Functions**

In this guide, we will continue building our travel booking system and introduce the concepts of **SQL aggregation functions**, which allow you to perform calculations on your data. We’ll cover:

- **Simple Aggregation Functions**
- **GROUP BY Clause**
- **SUM() Function**
- **AVG() Function**
- **MIN() and MAX() Functions**
- **COUNT() Function**

Let’s dive into these topics while adding more data to our travel booking system.

---

### **1. Introducing Aggregation Functions**

Aggregation functions are used to perform calculations on a set of values and return a single result. These functions are useful for summarizing data, such as calculating the total price of flights, the average price, or the number of users.

---

### **2. Adding More Data to the Flights and Users Tables**

To fully explore these functions, let’s add more flight data to our `Flights` table and some bookings information.

#### **Add More Flights**
Add the following to your `travel-booking-system.sql` file:
```sql
-- Insert additional flight data
INSERT INTO Flights (origin, destination, departure_time, arrival_time, price) 
VALUES ('San Francisco', 'Tokyo', '2024-11-01 06:00', '2024-11-01 18:00', 700.00);

INSERT INTO Flights (origin, destination, departure_time, arrival_time, price) 
VALUES ('Los Angeles', 'Paris', '2024-12-01 07:30', '2024-12-01 19:00', 600.00);

INSERT INTO Flights (origin, destination, departure_time, arrival_time, price) 
VALUES ('New York', 'Berlin', '2024-10-10 09:00', '2024-10-10 21:00', 650.00);
```

#### **Add Bookings Table**
We’ll also create a `Bookings` table to track the flights booked by users.

```sql
-- Create Bookings table
CREATE TABLE Bookings (
    booking_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    flight_id INTEGER,
    booking_date TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (flight_id) REFERENCES Flights(flight_id)
);

-- Insert sample bookings
INSERT INTO Bookings (user_id, flight_id, booking_date) 
VALUES (1, 1, '2024-09-15');

INSERT INTO Bookings (user_id, flight_id, booking_date) 
VALUES (2, 3, '2024-09-16');

INSERT INTO Bookings (user_id, flight_id, booking_date) 
VALUES (1, 4, '2024-09-17');
```

---

### **3. The COUNT() Function**

The **COUNT()** function is used to count the number of rows that match a certain condition or to count the total number of rows in a table.

#### **Example: Counting the Number of Flights**
```sql
-- Count the total number of flights
SELECT COUNT(*) AS total_flights 
FROM Flights;
```

#### **Example: Counting the Number of Bookings for a Specific User**
Let’s count how many bookings `Alice Johnson` has made:
```sql
-- Count bookings for Alice Johnson
SELECT COUNT(*) AS total_bookings 
FROM Bookings 
JOIN Users ON Bookings.user_id = Users.user_id 
WHERE Users.name = 'Alice Johnson';
```

---

### **4. The SUM() Function**

The **SUM()** function adds up the values in a specified column, which is useful for calculating totals.

#### **Example: Calculating the Total Revenue from Flights**
We can use `SUM()` to calculate the total revenue generated from all flights.
```sql
-- Calculate total revenue from all flights
SELECT SUM(price) AS total_revenue 
FROM Flights;
```

#### **Example: Total Revenue from Flights Booked by Alice Johnson**
```sql
-- Calculate total revenue from Alice Johnson's bookings
SELECT SUM(Flights.price) AS total_revenue 
FROM Bookings 
JOIN Flights ON Bookings.flight_id = Flights.flight_id
JOIN Users ON Bookings.user_id = Users.user_id 
WHERE Users.name = 'Alice Johnson';
```

---

### **5. The AVG() Function**

The **AVG()** function calculates the average value of a numeric column. Let’s use it to find the average price of flights.

#### **Example: Calculating the Average Flight Price**
```sql
-- Calculate average flight price
SELECT AVG(price) AS average_price 
FROM Flights;
```

---

### **6. The MIN() and MAX() Functions**

The **MIN()** and **MAX()** functions return the minimum and maximum values in a column, respectively.

#### **Example: Finding the Cheapest and Most Expensive Flights**
```sql
-- Find the cheapest flight
SELECT MIN(price) AS cheapest_flight 
FROM Flights;

-- Find the most expensive flight
SELECT MAX(price) AS most_expensive_flight 
FROM Flights;
```

---

### **7. The GROUP BY Clause**

The **GROUP BY** clause is used to group rows that have the same values in specified columns. It’s useful when used with aggregation functions to group results based on certain criteria.

#### **Example: Grouping Flights by Origin City and Calculating Total Revenue per City**
We can group the flights by the `origin` city and calculate the total revenue generated from each city.

```sql
-- Group flights by origin city and calculate total revenue per city
SELECT origin, SUM(price) AS revenue_per_city 
FROM Flights 
GROUP BY origin;
```

#### **Example: Counting the Number of Bookings Per Flight**
```sql
-- Count the number of bookings per flight
SELECT Flights.origin, Flights.destination, COUNT(Bookings.booking_id) AS total_bookings
FROM Flights
JOIN Bookings ON Flights.flight_id = Bookings.flight_id
GROUP BY Flights.flight_id;
```

---

### **8. HAVING Clause (Optional)**

The **HAVING** clause allows you to filter the results after using a **GROUP BY** clause, which is useful when you want to apply conditions to grouped data.

#### **Example: Finding Cities with Total Revenue Greater Than $1000**
```sql
-- Find origin cities with total revenue greater than $1000
SELECT origin, SUM(price) AS revenue_per_city
FROM Flights
GROUP BY origin
HAVING SUM(price) > 1000;
```

---

### **9. Next Steps**

Now that we’ve covered basic aggregation functions, you have the tools to analyze data in the travel booking system. Next, we’ll work on creating more complex queries involving **joins**, **subqueries**, and more advanced data manipulation techniques to handle real-world problems.

---

### **Conclusion**
   - Aggregation functions allow you to perform calculations on data, such as counting records, summing values, and finding averages or extremes.
   - The `GROUP BY` clause helps organize and summarize data based on a specific column.
   - You now have a solid understanding of how to use these functions to analyze data in the travel booking system.