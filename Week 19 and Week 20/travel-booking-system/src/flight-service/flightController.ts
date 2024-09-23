import { Request, Response } from 'express';
import axios from 'axios';
import Flight from './flightModel.js';

const create = async (req: Request, res: Response) => {
    const { origin, destination, price, userId } = req.body;
    try {
        await axios.get(`http://localhost:${process.env.USER_SERVICES_PATH}/users/${userId}`); // will return 404 if the user is not found and will be caught in the catch block
        const newFlight = {
            origin,
            destination,
            price,
        };
        const flight = new Flight(newFlight);
        await flight.save();
        res.status(201).send(newFlight); // Respond with the created flight
    } catch (error: any) {
        if (error.response.status === 404) {
            return res.status(404).send({ message: 'User not found' });
        } else {
            return res.status(error.status || 500).send(error);
        }
    };
}

const get =  async (req: Request, res: Response) => {
    const flights = await Flight.find();
    res.status(200).send(flights); // Respond with the list of flights
};

const getByID = async (req: Request, res: Response) => {
    const flightId = req.params.id;
    try {
        const flight = await  Flight.findById(flightId);
        if (!flight) {
            return res.status(404).send({ message: 'Flight not found' });
        }
        res.status(200).send(flight); // Respond with the found flight
    } catch(error) {
        res.status(500).send(error);
    }
};

const remove = async (req: Request, res: Response) => {
    const flightId = req.params.id;
    await Flight.findByIdAndDelete(flightId);
    res.status(204).send(); // Respond with no content
};

export default {get, getByID, create, remove};