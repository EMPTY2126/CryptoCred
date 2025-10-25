import { Router } from "express";
import notifiController from "../controllers/notifiController.js";

export const router = Router();

router.get('/:userId', notifiController.getNotifications);
router.post('/:userId', notifiController.addNotification);
router.delete('/:userId', notifiController.deleteNotification);
router.delete('/:userId/clear', notifiController.clearAllNotifications);

