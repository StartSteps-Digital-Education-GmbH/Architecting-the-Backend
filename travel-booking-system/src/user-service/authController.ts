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

const signin = async (req: Request,res: Response) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({
            email,
        });
        if(!user) {
            return res.status(404).send('User Not Found!');
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).send('Password in wrong');
        }

        res.status(200).send('User Loge in');

    } catch (error) {
        res.status(500).send(error)
    }
}

export default {
    signup,
    signin
}