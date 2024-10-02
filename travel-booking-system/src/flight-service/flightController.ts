import { Request, Response } from 'express';
import { AppDataSource } from '../database/ormconfig.js';
import { Flight } from '../entities/Flight.js';


const flightRepo = AppDataSource.getRepository(Flight);
const create = async (req: Request, res: Response) => {
    try {
        const { origin, destination, price, departure_time, arrival_time } = req.body;
        const newFlight = flightRepo.create({ origin, destination,departure_time, arrival_time, price })
        await flightRepo.save(newFlight);
        res.status(201).send(newFlight);
    } catch (error: any) {
        return res.status(error.status || 500).send({message:error.message, userMessage: "Somthing went wrong"});
    }
}

const get =  async (req: Request, res: Response) => {
    const flights = await flightRepo.find();
    res.status(200).send(flights); // Respond with the list of flights
};

const getByID = async (req: Request, res: Response) => {
    const flightId = parseInt(req.params.id);
    try {
        const flight = await flightRepo.findOneBy({
            flight_id: flightId
        });
        if (!flight) {
            return res.status(404).send({ message: 'Flight not found' });
        }
        res.status(200).send(flight); // Respond with the found flight
    } catch(error) {
        res.status(500).send(error);
    }
};

const remove = async (req: Request, res: Response) => {
    const flightId = parseInt(req.params.id);

    const result = await flightRepo.delete(flightId);
    if(result.affected === 0) {
        return res.status(404).send('flight not Found')
    }
    res.status(204).send(); // Respond with no content
};

const updateById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const {origin, destination, price, departure_time, arrival_time } = req.body;

        const flight = await flightRepo.findOneBy({flight_id: id});
        if (!flight) {
            return res.status(404).send({ message: 'Flight not found' });
        }
        flightRepo.merge(flight, {
            origin, destination, price, departure_time, arrival_time 
        })
        await flightRepo.save(flight)
        res.status(200).send(flight);
    } catch(error: any) {
        console.log(error)
        res.status(error.status || 500).send(error.message || "Somthing went wrong")
    }
}

export default {get, getByID, create, remove, updateById};