import express from 'express';
import { adminController } from '../controllers/index.js';
import {
  registerAdminValidator,
  loginAdminValidator,
  authValidator,
} from '../middlewares/index.js';

const router = express.Router();

router
  .route('/register')
  .post(registerAdminValidator, adminController.adminRegister);

router
  .route('/login')
  .post(loginAdminValidator, adminController.adminLogin);

router
  .route('/')
  .get(authValidator, adminController.getAllAdmins);

router
  .route('/:id')
  .get(authValidator, adminController.getOneAdmin)
  .patch(authValidator, adminController.updateAdmin);

router
  .route('/:id/destroy')
  .delete(authValidator, adminController.deleteAdmin);

export default router;
