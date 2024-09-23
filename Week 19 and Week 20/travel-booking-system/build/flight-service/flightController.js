import axios from 'axios';
import Flight from './flightModel.js';
const create = async (req, res) => {
    const { origin, destination, price, userId } = req.body;
    const newFlight = {
        origin,
        destination,
        price,
    };
    const userRequest = await axios.get(`http://localhost:${process.env.USER_SERVICES_PATH}/users/${userId}`);
    if (userRequest.status === 200) {
        const flight = new Flight(newFlight);
        await flight.save();
        res.status(201).send(newFlight); // Respond with the created flight
    }
    else {
        return res.status(404).send("User not Found");
    }
    ;
};
const get = async (req, res) => {
    const flights = await Flight.find();
    res.status(200).send(flights); // Respond with the list of flights
};
const getByID = async (req, res) => {
    const flightId = req.params.id;
    try {
        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(404).send({ message: 'Flight not found' });
        }
        res.status(200).send(flight); // Respond with the found flight
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const remove = async (req, res) => {
    const flightId = req.params.id;
    await Flight.findByIdAndDelete(flightId);
    res.status(204).send(); // Respond with no content
};
export default { get, getByID, create, remove };
