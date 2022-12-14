import joi from 'joi';

const costumerSchema = joi.object({
  name: joi.string().required(),
  lastName: joi.string().required(),
  birthday: joi.date().required(),
  phone: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  addres: joi.string(),
  city: joi.string().required(),
  zipCode: joi.string().required(),
});

export default async (req, res, next) => {
  try {
    await costumerSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};