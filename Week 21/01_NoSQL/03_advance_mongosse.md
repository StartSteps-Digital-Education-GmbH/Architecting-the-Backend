## Mongoose and MongoDB Guide: Advanced Features

### Part 1: Adding Initial Data to Collections

To ensure you have data to work with, let’s add a few records to each collection. This will help in visualizing the results of filtering, sorting, and aggregation.

#### Adding Data to User Collection
```javascript
await User.create([
    { name: 'Alice', email: 'alice@example.com', age: 28 },
    { name: 'Bob', email: 'bob@example.com', age: 34 },
    { name: 'Carol', email: 'carol@example.com', age: 22 }
]);
```

#### Adding Data to Flight Collection
```javascript
await Flight.create([
    { origin: 'New York', destination: 'Paris', price: 500 },
    { origin: 'San Francisco', destination: 'London', price: 700 },
    { origin: 'Los Angeles', destination: 'Tokyo', price: 850 }
]);
```

#### Adding Data to Booking Collection
```javascript
// Assuming you have IDs for a user and a flight
await Booking.create([
    { user: 'User ObjectId Here', flight: 'Flight ObjectId Here', bookingDate: new Date(), status: 'confirmed' },
    { user: 'User ObjectId Here', flight: 'Flight ObjectId Here', bookingDate: new Date(), status: 'Pending' }
]);
```

### Part 2: Filtering Data

Use filters to find records based on specific criteria. In Mongoose, filters are applied through the `.find()` method.

#### Example: Get All Confirmed Bookings
```javascript
const confirmedBookings = await Booking.find({ status: 'confirmed' });
console.log(confirmedBookings);
```
- **Explanation**: This query searches for all bookings where the `status` field is set to `'confirmed'`. Using `find()` with an object of key-value pairs applies the specified criteria to filter documents.

### Part 3: Sorting Data

Mongoose’s `.sort()` method allows you to order results based on specified fields. 

#### Example: Sort Flights by Price (Ascending)
```javascript
const sortedFlights = await Flight.find().sort({ price: 1 });
console.log(sortedFlights);
```
- **Explanation**: `{ price: 1 }` sorts the `Flight` documents by price in ascending order. A `-1` would sort in descending order.

### Part 4: Aggregations

Aggregation is used for more complex data processing, like calculating averages or creating group-based results. Mongoose’s `.aggregate()` function makes this easy.

#### Example: Average Flight Price by Destination
```javascript
const avgPrice = await Flight.aggregate([
    { $group: { _id: "$destination", averagePrice: { $avg: "$price" } } }
]);
console.log(avgPrice);
```
- **Explanation**: The `$group` stage groups documents by the `destination` field, calculating an `averagePrice` for each group using `$avg`. The `$avg` operator takes the specified field (`$price`) and averages the values across all documents in the group.

#### Example: Count of Bookings Per Status
```javascript
const bookingCount = await Booking.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
]);
console.log(bookingCount);
```
- **Explanation**: Here, `$group` groups the `Booking` documents by `status`. The `$sum` operator, used as `$sum: 1`, increments the `count` for each document in the group. This will provide the count of bookings for each status.

### Part 5: Updating CRUD Operations

To integrate the new operations, we can modify the existing APIs or create new endpoints in our booking microservice. Let’s update a few methods to leverage these advanced features.

#### Updating CRUD Operations in Booking API
Example: Updating the `GET /bookings` API to include filtering by status and sorting by booking date.

```javascript
// Assuming Express.js route
app.get('/bookings', async (req, res) => {
    const { status } = req.query;
    const query = status ? { status } : {};
    
    const bookings = await Booking.find(query).sort({ bookingDate: -1 });
    res.json(bookings);
});
```
- **Explanation**: This code retrieves all bookings and filters them by `status` if a query parameter is provided. It also sorts the bookings by `bookingDate` in descending order.
Here's the revised guide for using Mongoose with MongoDB, focused on advanced database operations in your travel management system serverless microservices. We’ve replaced the Prisma Studio section with additional Mongoose features, while keeping your preferred six-part structure.

---

### Part 6: Additional Mongoose Features

#### Example: Counting Documents

```javascript
const totalUsers = await User.countDocuments();
console.log(`Total users: ${totalUsers}`);
```

Explanation:
- `countDocuments()`: Returns the total count of documents in the `User` collection.

#### Example: Using `skip` and `limit` for Pagination

```javascript
const page = 1;
const limit = 10;
const paginatedUsers = await User.find().skip((page - 1) * limit).limit(limit);
console.log(paginatedUsers);
```

Explanation:
- `skip((page - 1) * limit)`: Skips a certain number of documents to get the specified page.
- `limit(limit)`: Limits the number of documents returned to the specified `limit`.

#### Example: Using Projections to Limit Fields

```javascript
const userNames = await User.find({}, { name: 1, _id: 0 });
console.log(userNames);
```

Explanation:
- `{ name: 1, _id: 0 }`: Only includes the `name` field in the result, excluding the `_id`.

---
