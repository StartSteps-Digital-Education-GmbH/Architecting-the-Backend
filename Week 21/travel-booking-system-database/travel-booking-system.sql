-- CREATE INDEX idx_flights_origin_destination ON Flights (origin, destination);
-- select * from flights;
explain SELECT
    *
from
    flights
where
    origin = 'New York'
    AND destination = 'Los Angeles';

-- CREATE INDEX idx_bookings_user_id ON bookings(user_id);

-- explain Select * from bookings where user_id = 1;