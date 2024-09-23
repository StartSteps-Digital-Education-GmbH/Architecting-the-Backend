import { Request, Response } from 'express';
import Flight from './flightModel.js';

const create = async (req: Request, res: Response) => {
    const { origin, destination, price } = req.body;
    const newFlight = {
        origin,
        destination,
        price,
    };
    const flight = new Flight(newFlight);
    await flight.save();
    res.status(201).send(newFlight); // Respond with the created flight
}

const get =  async (req: Request, res: Response) => {
    const flights = await Flight.find();
    res.status(200).send(flights); // Respond with the list of flights
};

const getByID = async (req: Request, res: Response) => {
    const flightId = req.params.id;
    const flight = await  Flight.findById(flightId);
    if (!flight) {
        return res.status(404).send({ message: 'Flight not found' });
    }
    res.status(200).send(flight); // Respond with the found flight
};

const remove = async (req: Request, res: Response) => {
    const flightId = req.params.id;
    await Flight.findByIdAndDelete(flightId);
    res.status(204).send(); // Respond with no content
};

export default {get, getByID, create, remove};