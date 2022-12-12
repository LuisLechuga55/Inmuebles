import mongoose from 'mongoose';
import config from './index.js';

const db = mongoose.connection;

db.on('error', () => {
  console.error('Error al conectar con la base de datos');
});

db.on('connecting', () => {
  console.log('Intentando conectar con la base de datos');
});

db.on('connceted', () => {
  console.log('Se ha conectado a la base de datos');
});

export default () => {
  mongoose.connect(`${config.database.uri}/${config.database.name}`)
};
