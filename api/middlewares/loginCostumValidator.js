import joi from 'joi';

const costumerSchema = joi.object({
  email: joi.string().required(),
  passwor: joi.string().required(),
});

export default async (req, res, next) => {
  try {
    await costumerSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};