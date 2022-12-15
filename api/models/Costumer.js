import mongoose from 'mongoose';

const costumerSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  addres: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);

export default mongoose.model('Costumer', costumerSchema);
