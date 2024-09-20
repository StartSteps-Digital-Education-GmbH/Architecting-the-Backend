import { validationResult, body } from "express-validator";
const userValidation  = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().notEmpty().withMessage('Email is Reuired')
];

export default {userValidation};