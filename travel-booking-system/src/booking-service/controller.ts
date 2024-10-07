import Booking from "../modals/bookingModel.js";
import { Request, Response } from "express";

const get = async (req: Request, res: Response) => {
    const bookings = await Booking.find();
    res.status(200).send(bookings);
}

export default {get};