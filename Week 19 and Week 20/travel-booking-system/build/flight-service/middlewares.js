import Joi from "joi";
const flightSchema = Joi.object({
    origin: Joi.string().required().messages({
        'string.base': 'Origin must be a string',
        'any.required': 'Origin is required'
    }),
    destination: Joi.string().required().messages({
        'string.base': 'Distination must be a string',
        'any.required': 'Distination is required'
    }),
    price: Joi.number().required().messages({
        'number.base': 'Price must be a Number',
        'any.required': 'Price is required'
    }),
    userId: Joi.string().required().messages({
        'string.base': 'Origin must be a string',
        'any.required': 'Origin is required'
    })
});
const validator = (req, res, next) => {
    const { error } = flightSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error);
    }
    next();
};
export default validator;
