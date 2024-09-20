import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction } from "express";
const userValidation  = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().notEmpty().withMessage('Email is reuired')
];

const userVallidationHandler = (req: Request, res:Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors);
    }
    next();
};

export default {userValidation, userVallidationHandler};