import express from 'express';
import { adminController } from '../controllers/index.js';
import { registerAdminValidator, loginAdminValidator } from '../middlewares/index.js';

const router = express.Router();

router
  .route('/register')
  .post(registerAdminValidator, adminController.adminRegister);

router
  .route('/login')
  .post(loginAdminValidator, adminController.adminLogin);

router
  .route('/')
  .get(adminController.getAllAdmins);

router
  .route('/:id')
  .get(adminController.getOneAdmin)
  .patch(adminController.updateAdmin);

router
  .route('/:id/destroy')
  .delete(adminController.deleteAdmin);

export default router;
