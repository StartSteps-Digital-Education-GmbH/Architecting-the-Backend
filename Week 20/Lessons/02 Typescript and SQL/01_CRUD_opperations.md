### CRUD Operations with SQL, TypeScript, SQLite, and TypeORM

In this second guide, we will cover how to implement all CRUD (Create, Read, Update, Delete) operations using TypeScript, SQLite, TypeORM, and Express. We will build on the travel booking system example introduced in the first guide and extend it to handle the full set of operations for the `Flight`, `User`, and `Booking` models.

#### Step 1: Set Up the Project

We will be using the same project structure as outlined in the previous guide, with the following models: `Flight`, `User`, and `Booking`.

If you have not followed the first guide, make sure you set up TypeScript, SQLite, and TypeORM as described. You can refer back to the previous guide for the detailed setup instructions.

#### Step 2: Defining the CRUD Operations for Each Model

##### Create (POST) Operations

1. **Creating a New Flight**
   Add a new route in `src/server.ts` for adding a flight:
   ```typescript
   app.post("/flights", async (req, res) => {
     const flightData = req.body;
     try {
       const flightRepository = AppDataSource.getRepository(Flight);
       const newFlight = flightRepository.create(flightData);
       await flightRepository.save(newFlight);
       res.status(201).json(newFlight);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   ```

2. **Creating a New User**
   Similarly, for creating a new user:
   ```typescript
   app.post("/users", async (req, res) => {
     const userData = req.body;
     try {
       const userRepository = AppDataSource.getRepository(User);
       const newUser = userRepository.create(userData);
       await userRepository.save(newUser);
       res.status(201).json(newUser);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   ```

3. **Creating a New Booking**
   And for creating a new booking:
   ```typescript
   app.post("/bookings", async (req, res) => {
     const bookingData = req.body;
     try {
       const bookingRepository = AppDataSource.getRepository(Booking);
       const newBooking = bookingRepository.create(bookingData);
       await bookingRepository.save(newBooking);
       res.status(201).json(newBooking);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   ```

##### Read (GET) Operations

1. **Get All Flights**
   To retrieve all flights:
   ```typescript
   app.get("/flights", async (req, res) => {
     const flightRepository = AppDataSource.getRepository(Flight);
     const flights = await flightRepository.find();
     res.json(flights);
   });
   ```

2. **Get All Users**
   For getting all users:
   ```typescript
   app.get("/users", async (req, res) => {
     const userRepository = AppDataSource.getRepository(User);
     const users = await userRepository.find();
     res.json(users);
   });
   ```

3. **Get All Bookings**
   To retrieve all bookings:
   ```typescript
   app.get("/bookings", async (req, res) => {
     const bookingRepository = AppDataSource.getRepository(Booking);
     const bookings = await bookingRepository.find({ relations: ["user", "flight"] });
     res.json(bookings);
   });
   ```

4. **Get a Specific Flight by ID**
   Add this route to retrieve a flight by its ID:
   ```typescript
   app.get("/flights/:id", async (req, res) => {
     const flightRepository = AppDataSource.getRepository(Flight);
     try {
       const flight = await flightRepository.findOneBy({ flight_id: parseInt(req.params.id) });
       if (!flight) {
         return res.status(404).json({ message: "Flight not found" });
       }
       res.json(flight);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   ```

##### Update (PUT) Operations

1. **Update a Flight**
   To update an existing flight, add the following route:
   ```typescript
   app.put("/flights/:id", async (req, res) => {
     const flightRepository = AppDataSource.getRepository(Flight);
     const { id } = req.params;
     const updateData = req.body;

     try {
       const flight = await flightRepository.findOneBy({ flight_id: parseInt(id) });
       if (!flight) {
         return res.status(404).json({ message: "Flight not found" });
       }

       const updatedFlight = flightRepository.merge(flight, updateData);
       await flightRepository.save(updatedFlight);
       res.json(updatedFlight);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   ```

2. **Update a User**
   Similarly, to update user details:
   ```typescript
   app.put("/users/:id", async (req, res) => {
     const userRepository = AppDataSource.getRepository(User);
     const { id } = req.params;
     const updateData = req.body;

     try {
       const user = await userRepository.findOneBy({ user_id: parseInt(id) });
       if (!user) {
         return res.status(404).json({ message: "User not found" });
       }

       const updatedUser = userRepository.merge(user, updateData);
       await userRepository.save(updatedUser);
       res.json(updatedUser);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   ```

3. **Update a Booking**
   Updating booking information:
   ```typescript
   app.put("/bookings/:id", async (req, res) => {
     const bookingRepository = AppDataSource.getRepository(Booking);
     const { id } = req.params;
     const updateData = req.body;

     try {
       const booking = await bookingRepository.findOneBy({ booking_id: parseInt(id) });
       if (!booking) {
         return res.status(404).json({ message: "Booking not found" });
       }

       const updatedBooking = bookingRepository.merge(booking, updateData);
       await bookingRepository.save(updatedBooking);
       res.json(updatedBooking);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   ```

##### Delete (DELETE) Operations

1. **Delete a Flight**
   To delete a flight by its ID:
   ```typescript
   app.delete("/flights/:id", async (req, res) => {
     const flightRepository = AppDataSource.getRepository(Flight);
     const { id } = req.params;

     try {
       const result = await flightRepository.delete(id);
       if (result.affected === 0) {
         return res.status(404).json({ message: "Flight not found" });
       }
       res.json({ message: "Flight deleted" });
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   ```

2. **Delete a User**
   To delete a user:
   ```typescript
   app.delete("/users/:id", async (req, res) => {
     const userRepository = AppDataSource.getRepository(User);
     const { id } = req.params;

     try {
       const result = await userRepository.delete(id);
       if (result.affected === 0) {
         return res.status(404).json({ message: "User not found" });
       }
       res.json({ message: "User deleted" });
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   ```

3. **Delete a Booking**
   And to delete a booking:
   ```typescript
   app.delete("/bookings/:id", async (req, res) => {
     const bookingRepository = AppDataSource.getRepository(Booking);
     const { id } = req.params;

     try {
       const result = await bookingRepository.delete(id);
       if (result.affected === 0) {
         return res.status(404).json({ message: "Booking not found" });
       }
       res.json({ message: "Booking deleted" });
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });
   ```

#### Step 3: Testing the CRUD Operations

You can now use an API testing tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the CRUD operations for the `Flight`, `User`, and `Booking` models.

1. **Create New Data**  
   Test creating new flights, users, and bookings using the `POST` routes.

2. **Retrieve Data**  
   Test retrieving data using the `GET` routes.

3. **Update Data**  
   Test updating existing records with the `PUT` routes.

4. **Delete Data**  
   Test deleting records using the `DELETE` routes.