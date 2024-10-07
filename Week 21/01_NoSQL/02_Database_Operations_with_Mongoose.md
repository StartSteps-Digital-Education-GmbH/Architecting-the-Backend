### Database Operations with Mongoose

---

#### Step 1: Set Up the Booking Microservice

1. **Create the Project Directory**
   - Inside your travel management system project folder, add a directory for the Booking microservice.
   
2. **Initialize a New Serverless Function**
   - Set up a new function file for the Booking microservice within the `api` folder, as we did previously for User and Flight services.

3. **Install Mongoose** 
   - Install Mongoose within the Booking microservice to handle MongoDB interactions.
   
   ```bash
   npm install mongoose
   ```

4. **Connect to MongoDB**
   - Inside the main function file (e.g., `bookings.js`), set up a MongoDB connection.

   ```javascript
   const mongoose = require('mongoose');

   mongoose.connect(process.env.MONGODB_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   })
   .then(() => console.log("Connected to MongoDB"))
   .catch((error) => console.error("MongoDB connection failed:", error));
   ```

#### Step 2: Define the Booking Schema and Model

For a basic booking system, you'll likely need to store data such as `user_id`, `flight_id`, `booking_date`, and `status`. Define a schema in Mongoose for this data:

```javascript
const bookingSchema = new mongoose.Schema({
   user_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true
   },
   flight_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Flight',
       required: true
   },
   booking_date: {
       type: Date,
       required: true
   },
   status: {
       type: String,
       enum: ['Pending', 'Confirmed', 'Cancelled'],
       default: 'Pending'
   }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
```

#### Step 3: Create CRUD Operations with Mongoose

Now, let's implement CRUD operations for the Booking microservice.

1. **Create a New Booking**

   ```javascript
   const createBooking = async (req, res) => {
       try {
           const booking = new Booking({
               user_id: req.body.user_id,
               flight_id: req.body.flight_id,
               booking_date: req.body.booking_date,
               status: req.body.status
           });

           await booking.save();
           res.status(201).json(booking);
       } catch (error) {
           res.status(500).json({ error: 'Error creating booking' });
       }
   };
   ```

2. **Get All Bookings**

   ```javascript
   const getAllBookings = async (req, res) => {
       try {
           const bookings = await Booking.find().populate('user_id flight_id');
           res.status(200).json(bookings);
       } catch (error) {
           res.status(500).json({ error: 'Error fetching bookings' });
       }
   };
   ```

3. **Get a Booking by ID**

   ```javascript
   const getBookingById = async (req, res) => {
       try {
           const booking = await Booking.findById(req.params.id).populate('user_id flight_id');
           if (!booking) {
               return res.status(404).json({ message: 'Booking not found' });
           }
           res.status(200).json(booking);
       } catch (error) {
           res.status(500).json({ error: 'Error fetching booking' });
       }
   };
   ```

4. **Update a Booking**

   ```javascript
   const updateBooking = async (req, res) => {
       try {
           const booking = await Booking.findByIdAndUpdate(
               req.params.id,
               req.body,
               { new: true, runValidators: true }
           );
           if (!booking) {
               return res.status(404).json({ message: 'Booking not found' });
           }
           res.status(200).json(booking);
       } catch (error) {
           res.status(500).json({ error: 'Error updating booking' });
       }
   };
   ```

5. **Delete a Booking**

   ```javascript
   const deleteBooking = async (req, res) => {
       try {
           const booking = await Booking.findByIdAndDelete(req.params.id);
           if (!booking) {
               return res.status(404).json({ message: 'Booking not found' });
           }
           res.status(200).json({ message: 'Booking deleted successfully' });
       } catch (error) {
           res.status(500).json({ error: 'Error deleting booking' });
       }
   };
   ```

#### Step 4: Test Your Booking Microservice

To test these endpoints, you can use Postman or another API testing tool. Verify that each operation (create, read, update, delete) is working correctly.

#### Step 5: Deploy the Booking Microservice

1. **Prepare for Deployment**:
   Ensure the `MONGODB_URI` is set correctly in your environment variables for your serverless platform (e.g., Vercel).

2. **Deploy the Service**:
   Deploy the function just as you did with the other services.

This completes the guide for setting up a basic Booking microservice using Mongoose, including defining the schema and implementing CRUD operations. You can extend this further with advanced features like pagination, filtering, or real-time booking status updates using a message broker or WebSockets if required.