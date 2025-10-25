import { Router } from 'express';
import paymentController from '../controllers/paymentController.js'

export const router = Router();



router.post('/pay', paymentController.depositInit);
router.post('/status', paymentController.getStatus);
router.get('/balance/:userEmail', paymentController.getBalance);
router.post('/withdraw', paymentController.withdraw)