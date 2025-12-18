const Joi = require('joi');

const userValidationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

const taskValidationSchema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    description: Joi.string().min(10).required(),
    status: Joi.string().valid('pending', 'completed').default('pending')
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

const validateTask = (req, res, next) => {
    const { error } = taskValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: error.details[0].message
        });
    }
    next();
};

module.exports = { validateUser, validateTask };
