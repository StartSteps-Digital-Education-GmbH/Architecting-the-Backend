import { Request,Response } from "express";
import { User } from "../entities/User.js";
import { AppDataSource } from "../database/ormconfig.js";

const userRepo = AppDataSource.getRepository(User);

const get = async (req: Request,res: Response) => {
    try{
        const users = await userRepo.find();
        res.send(users);
    } catch(error) {
        res.status(500).send(error)
    }
};

const getByID =  async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await userRepo.findOneBy({
        user_id: userId
    });
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user); // Respond with the found user
}

const create = async (req: Request,res: Response) => {
    const {name, email} = req.body;
    const user = userRepo.create({name, email});
    await userRepo.save(user);
    res.status(201).send(user);
}

const update =  async (req: Request,res: Response) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = await userRepo.findOneBy({
        user_id: userId
    });
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    const updatedUser = userRepo.merge(user, {
        name,
        email
    });
    await userRepo.save(updatedUser);
    res.status(200).send(updatedUser); // Respond with the updated user
}

const remove =  async (req: Request,res: Response) => {
    const userId = parseInt(req.params.id);
    const result = await userRepo.delete(userId);

    if(result.affected === 0) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(204).send(); // Respond with no content
}

export default {get, getByID, create, update, remove};