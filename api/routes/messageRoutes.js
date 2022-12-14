import express from 'express';
import { messageController } from '../controllers/index.js';
import { messageValidator } from '../middlewares/index.js';

const router = express.Router();

router
  .route('/properties/:id/messages')
  .get(messageController.getMessageById)
  .post(messageValidator, messageController.createMessage);

router
  .route('/properties/:id/message/:messageId')
  .delete(messageController.deleteMessageById);

export default router;
