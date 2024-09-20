import flightController from './flightController.js';
import { Router } from 'express';
const router = Router();
// Mock database (in-memory storage)
let flights = [];
router.post('/', flightController.create);
router.get('/', flightController.get);
router.get('/:id', flightController.getByID);
router.delete('/:id', flightController.remove);
export default router;
