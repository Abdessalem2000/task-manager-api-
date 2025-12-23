const Joi = require('joi');

// دالة التحقق - تضمين name و username باش ما يصرى حتى تعارض
const validateRegister = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 'error', message: error.details[0].message });
    }
    next();
};

// تصدير الدالة باسم واحد فقط
module.exports = validateRegister;