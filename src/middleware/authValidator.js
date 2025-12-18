const Joi = require('joi');

const userValidationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

const validateUser = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: error.details[0].message
        });
    }
    next();
};

module.exports = { validateUser };