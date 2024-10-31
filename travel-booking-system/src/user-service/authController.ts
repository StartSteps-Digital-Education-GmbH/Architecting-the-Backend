import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import User from '../modals/userModel.js';
const signup = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    try {
        const hashedPAssword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, 
            email,
            password: hashedPAssword
        });
        await newUser.save();
        res.status(201).send({
            message: "User created",
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

export default {
    signup
}