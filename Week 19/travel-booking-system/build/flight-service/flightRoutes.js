import express from 'express';
const router = express.Router();
// Mock database (in-memory storage)
let flights = [];
// Route to create a new flight
router.post('/', (req, res) => {
    const { origin, destination, price } = req.body;
    const newFlight = {
        id: flights.length + 1, // Simple ID generation
        origin,
        destination,
        price,
    };
    flights.push(newFlight); // Add flight to the mock database
    res.status(201).send(newFlight); // Respond with the created flight
});
// Route to get all flights
router.get('/', (req, res) => {
    res.status(200).send(flights); // Respond with the list of flights
});
// Route to get a flight by ID
router.get('/:id', (req, res) => {
    const flightId = parseInt(req.params.id);
    const flight = flights.find(f => f.id === flightId);
    if (!flight) {
        return res.status(404).send({ message: 'Flight not found' });
    }
    res.status(200).send(flight); // Respond with the found flight
});
// Route to delete a flight
router.delete('/:id', (req, res) => {
    const flightId = parseInt(req.params.id);
    flights = flights.filter(f => f.id !== flightId); // Remove flight
    res.status(204).send(); // Respond with no content
});
export default router;
