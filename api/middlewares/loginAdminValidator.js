import joi from 'joi';

const adminSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

export default async (req, res, next) => {
  try {
    await adminSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};
