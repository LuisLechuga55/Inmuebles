import express from 'express';

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get('/api', (_, res) => {
  console.log('API funcionando');

  return res.json({
    msg: 'API funcionando',
  });
});

export default api;
