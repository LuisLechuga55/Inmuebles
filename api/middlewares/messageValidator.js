import joi from 'joi';

const messageSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  message: joi.string().required(),
});

export default async (req, res, next) => {
  try {
    await messageSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'error al validar el mensaje',
    });
  }
};
