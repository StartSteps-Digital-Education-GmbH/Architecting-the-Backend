import { validationResult, body } from "express-validator";
const userValidation = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().notEmpty().withMessage('Email is reuired')
];
const userVallidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors);
    }
    next();
};
export default { userValidation, userVallidationHandler };
