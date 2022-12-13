import express from 'express';
import cors from 'cors';
import { adminRoutes } from './routes/index.js';

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

export default api;


// master-dev.f/portafolio/tengotechoytuno
// master-dev.f/portafolio/ecommerce-backend
// inmuebles