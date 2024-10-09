import { Request, Response } from 'express';
import axios from 'axios';
import Flight from '../modals/flightModel.js';
import User from '../modals/userModel.js';
import { queryParser } from '../utils/index.js';

const create = async (req: Request, res: Response) => {
    try {
    const { origin, destination, price } = req.body;
        const newFlight = {
            origin,
            destination,
            price,
        };
        const flight = new Flight(newFlight);
        await flight.save();
        res.status(201).send(flight);
    } catch (error: any) {
        return res.status(error.status || 500).send({message:error.message, userMessage: "Somthing went wrong"});
    }
}

const get =  async (req: Request, res: Response) => {
    const filter = queryParser(req.query, ['origin', 'destination']);
    const sortByPrice = req.query.sortByPrice; //accepted values = asc, desc,ascending, descending
    let sortBy = {};
    if(sortByPrice) { 
        sortBy = {
            price: sortByPrice
        }
    }
    const flights = await Flight.find(filter).sort(sortBy);
    res.status(200).send(flights);
};

const getByID = async (req: Request, res: Response) => {
    const flightId = req.params.id;
    try {
        const flight = await  Flight.findById(flightId);
        if (!flight) {
            return res.status(404).send({ message: 'Flight not found' });
        }
        res.status(200).send(flight);
    } catch(error) {
        res.status(500).send(error);
    }
};

const remove = async (req: Request, res: Response) => {
    const flightId = req.params.id;
    await Flight.findByIdAndDelete(flightId);
    res.status(204).send(); // Respond with no content
};

const updateById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {origin, destination, price} = req.body;
        const updatedFight = await Flight.findByIdAndUpdate(id, {
            origin,
            destination,
            price
        }, {new: true});
        res.status(200).send(updatedFight);
    } catch(error: any) {
        console.log(error)
        res.status(error.status || 500).send(error.message || "Somthing went wrong")
    }
}

const getAveragePrice = async (req: Request, res: Response) => {
    const groupBy = req.query.groupBy || "$origin"
    const flights = await Flight.aggregate([
        {$group: {_id: groupBy, averagePrice: {$avg: "$price"}}} //give us the avreage price for each origin
    ]);
    res.status(200).send(flights);
}

export default {get, getByID, create, remove, updateById, getAveragePrice};