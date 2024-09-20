import express from 'express';
import flightController from './flightController.js';
import { Router } from 'express';

const router =  Router();
router.post('/', flightController.create);
router.get('/', flightController.get);
router.get('/:id', flightController.getByID);
router.delete('/:id', flightController.remove);

export default router;