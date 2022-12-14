import mongoose from 'mongoose';
import Admin from './Admin.js';

const propertySchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  outsideNumber: {
    type: Number,
    required: true,
  },
  interiorNumber: {
    type: Number,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  typeOffer: {
    type: String,
    enum: ['sell', 'rental'],
    default: 'sell',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  numberRooms: {
    type: Number,
    required: true,
  },
  // images: [],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Admin.name,
  },
});

export default mongoose.model('Property', propertySchema);
