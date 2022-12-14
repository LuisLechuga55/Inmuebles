import express from 'express';
import { costumerController } from '../controllers/index.js'

const router = express.Router();

router
  .route('/register')
  .post(costumerController.registerCostumer);

router
  .route('/login')
  .post(costumerController.loginCostumer);

router
  .route('/')
  .get(costumerController.getAllCostumer);

router
  .route('/:id')
  .get(costumerController.getOneCostumer)
  .patch(costumerController.updateCostumer);

router
  .route('/:id/destroy')
  .delete(costumerController.deleteCostumer);

export default router;
