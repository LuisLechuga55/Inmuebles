import express from 'express';
import cors from 'cors';
import {
  adminRoutes,
  messageRoutes,
  propertyRoutes,
  costumerRoutes,
  imageRoutes,
} from './routes/index.js';

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.use(cors());

api.get('/api', (_, res) => {
  console.log('API funcionando');
  return res.json({
    msg: 'API funcionando',
  });
});

api.get('/', (_, res) => {
  console.log('Se ejecuto la ruta base');
  res.send('El servidor esta corriendo 🚀')
});

api.use('/admin', adminRoutes);

api.use('/costumer', costumerRoutes);

api.use('/property', propertyRoutes);

api.use('/images', imageRoutes);

api.use('/property/messages', messageRoutes);

export default api;
