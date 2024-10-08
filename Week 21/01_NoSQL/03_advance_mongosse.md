### 1. **Setting Up the Schemas**

Let’s first define the schemas for the `User`, `Flight`, and `Booking` collections. Here’s an example of what each schema might look like:

#### User Schema
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
```

#### Flight Schema
```javascript
const flightSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Flight', flightSchema);
```

#### Booking Schema
```javascript
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  bookingDate: { type: Date, default: Date.now },
  passengers: { type: Number, required: true },
  totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
```

### 2. **Example Data Imports**

Let’s add some sample data to `User`, `Flight`, and `Booking` collections for testing our advanced queries. This step is essential to have enough data for meaningful results when we run aggregation and filtering operations.

```javascript
// Sample Users
const users = [
  { name: 'Alice', email: 'alice@example.com', age: 30 },
  { name: 'Bob', email: 'bob@example.com', age: 45 },
  { name: 'Charlie', email: 'charlie@example.com', age: 25 },
];

// Sample Flights
const flights = [
  { destination: 'Paris', departureDate: new Date('2024-12-15'), seatsAvailable: 50, price: 500 },
  { destination: 'Tokyo', departureDate: new Date('2024-12-20'), seatsAvailable: 20, price: 800 },
  { destination: 'New York', departureDate: new Date('2024-12-18'), seatsAvailable: 30, price: 700 },
];

// Sample Bookings
const bookings = [
  { user: '<user_id_1>', flight: '<flight_id_1>', passengers: 2, totalAmount: 1000 },
  { user: '<user_id_2>', flight: '<flight_id_2>', passengers: 1, totalAmount: 800 },
];
```

---

### 3. **Advanced Queries**

#### a. Filtering Data
Let’s filter `Flight` documents to retrieve all flights with seats available greater than 25.

```javascript
Flight.find({ seatsAvailable: { $gt: 25 } })
  .then(flights => console.log(flights))
  .catch(err => console.error(err));
```

**Explanation:** Here, `$gt` is used for filtering data based on a condition where `seatsAvailable` is greater than `25`. The `$gt` stands for “greater than.”

---

#### b. Sorting Data
Now, let’s sort the flights based on the price in descending order.

```javascript
Flight.find().sort({ price: -1 })
  .then(flights => console.log(flights))
  .catch(err => console.error(err));
```

**Explanation:** Using `.sort({ price: -1 })` sorts the data by `price` in descending order (`-1`). For ascending order, you would use `1`.

---

#### c. Aggregations

##### i. Sum of Bookings
Let’s calculate the total number of passengers across all bookings.

```javascript
Booking.aggregate([
  { $group: { _id: null, totalPassengers: { $sum: "$passengers" } } }
])
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

**Explanation:** Here, `$sum: "$passengers"` sums up the `passengers` field for each document. The `$group` stage groups all documents, and `null` as `_id` means we’re not grouping by any particular field.

##### ii. Average Price of Flights
Let’s find the average price of all flights.

```javascript
Flight.aggregate([
  { $group: { _id: null, averagePrice: { $avg: "$price" } } }
])
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

**Explanation:** `$avg: "$price"` calculates the average of the `price` field across all documents in the `Flight` collection.

##### iii. Bookings by Destination
Let’s find out how many bookings there are for each flight destination.

```javascript
Booking.aggregate([
  {
    $lookup: {
      from: 'flights',
      localField: 'flight',
      foreignField: '_id',
      as: 'flightInfo'
    }
  },
  { $unwind: "$flightInfo" },
  {
    $group: {
      _id: "$flightInfo.destination",
      bookingCount: { $sum: 1 }
    }
  }
])
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

**Explanation:** 
- `$lookup` is used to join the `Booking` collection with the `Flight` collection based on the `flight` ID field.
- `$unwind` breaks down arrays (from the lookup) so each document is a single array item.
- `$sum: 1` counts each document in the group (essentially counting the number of bookings per destination).

---

#### d. Using Date Queries

Let’s find all flights departing after December 17, 2024.

```javascript
Flight.find({ departureDate: { $gt: new Date('2024-12-17') } })
  .then(flights => console.log(flights))
  .catch(err => console.error(err));
```

**Explanation:** The `$gt` operator is also applicable for dates. Here, we’re retrieving flights with a `departureDate` after December 17, 2024.

---

### 4. **Combining Operations**

You can combine these advanced operations, such as sorting, filtering, and aggregations, to create more complex queries. For instance:

```javascript
Booking.aggregate([
  {
    $lookup: {
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'userInfo'
    }
  },
  {
    $match: { "userInfo.age": { $gte: 30 } }
  },
  {
    $group: { _id: "$flight", totalPassengers: { $sum: "$passengers" } }
  },
  {
    $sort: { totalPassengers: -1 }
  }
])
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

In this example:
1. We join the `User` collection to add `userInfo` to each `Booking` document.
2. We filter (`$match`) to only include bookings where the user’s age is 30 or older.
3. We group the bookings by flight and count the total passengers for each flight.
4. We sort the results by `totalPassengers` in descending order.

---

With these examples, you’ll have a solid understanding of advanced Mongoose features, along with how to use them within the context of your travel management system's serverless microservices. You can experiment with different operations and combinations to suit specific application needs.
