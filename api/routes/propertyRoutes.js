import express from 'express';
import { propertyController } from '../controllers/index.js';
import protectedRoute from '../middlewares/protectedRoute.js';

const router = express.Router();

router
  .route('/')
  .post(propertyController.createProperty)
  .get(propertyController.getAllProperty);

router
  .route('/:id')
  .get(propertyController.getPropertyById)
  .patch(protectedRoute, propertyController.updatePropertyById)
  .delete(propertyController.deletePropertyById);

export default router;
