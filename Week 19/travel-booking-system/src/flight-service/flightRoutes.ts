import express from 'express';
import flightController from './flightController.js';
import { Router } from 'express';
// Flight interface to define the structure of a flight
interface Flight {
    id: number;
    origin: string;
    destination: string;
    price: number;
}

const router =  Router();

// Mock database (in-memory storage)
let flights: Flight[] = [];
router.post('/', flightController.create);
router.get('/', flightController.get);
router.get('/:id', flightController.getByID);
router.delete('/:id', flightController.remove);

export default router;