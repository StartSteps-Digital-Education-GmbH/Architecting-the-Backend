-- CREATE INDEX idx_flights_origin_destination ON Flights (origin, destination);
-- select * from flights;
-- explain SELECT
--     *
-- from
--     flights
-- where
--     origin = 'New York'
--     AND destination = 'Los Angeles';
-- CREATE INDEX idx_bookings_user_id ON bookings(user_id);
-- explain query plan Select * from bookings where user_id = 1;
-- BEGIN TRANSACTION;
-- INSERT INTO
--     Bookings (user_id, flight_id, booking_date)
-- VALUES
--     (1, 2, '2024-09-30');
-- INSERT INTO
--     Payments (booking_id, amount, payment_date, payment_method)
-- VALUES
--     (
--         LAST_INSERT_ROWID (),
--         250.00,
--         '2024-09-30',
--         'Credit Card'
--     );
-- COMMIT;
-- SELECT * from bookings;
-- SElect * from Payments;
-- BEGIN Transaction;
-- INSERT INTO
--     Bookings (user_id, flight_id, booking_date)
-- VALUES
--     (2, 3, '2024-09-30');
-- --payment fails here 
-- ROLLBACK;
-- SELECT * from bookings;
-- -- SElect * from Payments;
-- BEGIN Transaction;

-- INSERT INTO
--     Bookings (user_id, flight_id, booking_date)
-- VALUES
--     (3, 3, '2024-10-05');

-- SAVEPOINT before_payment;

-- INSERT INTO
--     Payments (booking_id, amount, payment_date, payment_method)
-- VALUES
--     (
--         LAST_INSERT_ROWID (),
--         250.00,
--         '2024-09-30',
--         'Credit Card'
--     );
-- -- ROLLBACK TO before_payment;
-- COMMIt;
-- ROLLBACK;
Select * from bookings;
select * from payments;
