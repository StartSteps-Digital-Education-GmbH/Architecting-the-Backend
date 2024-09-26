-- Create Flights table
-- CREATE TABLE Flights (
--     flight_id INTEGER PRIMARY KEY,
--     origin TEXT NOT NULL,
--     destination TEXT NOT NULL,
--     departure_time TEXT NOT NULL,
--     arrival_time TEXT NOT NULL,
--     price REAL NOT NULL
-- );

-- CREATE TABLE Users (
--     user_id INTEGER PRIMARY KEY,
--     name TEXT NOT NULL,
--     email TEXT NOT NULL UNIQUE
-- );

-- INSERT INTO Flights (origin, destination,departure_time,arrival_time, price)
-- VALUES ('Paris', 'Berlin', '2024-10-01 08:00', '2024-10-01 20:00', 500);

-- SELECT * FROM Flights;
-- INSERT INTO Users (name, email)
-- VALUES ('john', 'john@test.com');
-- SELECT * FROM Users;
-- SELECT * FROM Flights;

-- UPDATE Flights SET price = 550 WHERE flight_id=5;
-- SELECT * FROM Flights;

-- DELETE FROM Flights WHERE price=500;
-- SELECT * FROM Flights;

-- Insert additional flight data
-- INSERT INTO Flights (origin, destination, departure_time, arrival_time, price) 
-- VALUES ('San Francisco', 'Tokyo', '2024-11-01 06:00', '2024-11-01 18:00', 700.00);

-- INSERT INTO Flights (origin, destination, departure_time, arrival_time, price) 
-- VALUES ('Los Angeles', 'Paris', '2024-12-01 07:30', '2024-12-01 19:00', 600.00);

-- INSERT INTO Flights (origin, destination, departure_time, arrival_time, price) 
-- VALUES ('New York', 'Berlin', '2024-10-10 09:00', '2024-10-10 21:00', 650.00);

-- SELECT * FROM Flights;
-- SELECT* FROM Users;

-- CREATE a Booking table, user_id, flight_id, booking_date, booking_id

-- CREATE TABLE Bookings (
--     booking_id INTEGER PRIMARY KEY,
--     user_id INTEGER,
--     flight_id INTEGER,
--     booking_date TEXT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES Users(user_id),
--     FOREIGN KEY (flight_id) REFERENCES Flights(flight_id)
-- );

-- INSERT INTO Users (name, email) 
-- VALUES ('Alice Johnson', 'alice.j@example.com');

-- INSERT INTO Users (name, email) 
-- VALUES ('Bob Smith', 'bob.s@example.com');

-- SELECT * FROM Users;
-- SELECT * FROM Flights;

-- INSERT INTO bookings (user_id, flight_id, booking_date)
-- VALUES (1, 2, '2024-10-25 06:00');

-- SELECT * from Bookings;
-- INSERT INTO Bookings (user_id, flight_id, booking_date) 
-- VALUES (1, 1, '2024-09-15');

-- INSERT INTO Bookings (user_id, flight_id, booking_date) 
-- VALUES (2, 3, '2024-09-16');

-- INSERT INTO Bookings (user_id, flight_id, booking_date) 
-- VALUES (1, 4, '2024-09-17');

-- SELECT * FROM Bookings;

-- SELECT * FROM Flights;

-- SELECT COUNT(*) AS total_flights FROM flights;
-- SELECT COUNT(*) AS user_total FROM Users;

-- SELECT COUNT(*) from flights WHERE price> 630;

-- SELECT SUM(price) AS total_sum from flights;

-- SELECT SUM(price) from flights WHERE price> 630;

-- SELECT AVG(price) FROM flights;
-- SELECT AVG(price) FROM flights WHERE price >= 650;

-- SELECT MAX(price) AS max_price FROM flights;

-- SELECT MIN(price) AS max_price FROM flights;

-- SELECT MAX(price) AS max_price FROM flights WHERE price<650;

-- INSERT INTO Flights (origin, destination, departure_time, arrival_time, price) 
-- VALUES ('San Francisco', 'Paris', '2024-11-01 06:00', '2024-11-01 18:00', 900.00);

-- INSERT INTO Flights (origin, destination, departure_time, arrival_time, price) 
-- VALUES ('Los Angeles', 'Berlin', '2024-12-01 07:30', '2024-12-01 19:00', 2000.00);

-- INSERT INTO Flights (origin, destination, departure_time, arrival_time, price) 
-- VALUES ('New York', 'Tokyo', '2024-10-10 09:00', '2024-10-10 21:00', 100.00);

-- SELECT * FROM Flights;

-- SELECT origin, AVG(Price), SUM(Price) FROM FLights GROUP BY origin;

-- SELECT origin, AVG(Price), SUM(Price) FROM FLights GROUP BY origin HAVING SUM(price)> 1000;


SELECT * FROM USERS;

SELECT * FROM Bookings;

SELECT * FROM Flights;

-- SELECT Users.name, Bookings.booking_date
-- FROM Bookings INNER JOIN USERS ON Bookings.user_id = Users.user_id;

SELECT Users.name, Bookings.booking_date, Flights.origin, Flights.destination
FROM Bookings INNER JOIN USERS ON Bookings.user_id = Users.user_id INNER JOIN Flights ON Bookings.flight_id = Flights.flight_id;