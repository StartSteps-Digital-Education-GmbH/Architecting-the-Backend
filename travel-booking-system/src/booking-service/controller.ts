import Booking from "../modals/bookingModel.js";
import { Request, Response } from "express";

const get = async (req: Request, res: Response) => {
    const bookings = await Booking.find();
    res.status(200).send(bookings);
}

const post = async (req:Request, res: Response) => {
    const {user, flight, status} = req.body;
    const bookingDate = new Date(req.body.bookingDate);
    const newBooking = new Booking({user, flight, bookingDate, status});
    await newBooking.save();
    res.status(201).send(newBooking);
}

export default {get, post};