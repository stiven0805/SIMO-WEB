/**
 * notifications.routes.js
 * ------------------------
 */

import { Router } from 'express';
import { NotificationsController } from './notifications.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();
const notificationsController = new NotificationsController();

router.use(authMiddleware);

router.get('/', (req, res) => notificationsController.getNotifications(req, res));
router.patch('/:id/read', (req, res) => notificationsController.markAsRead(req, res));

export default router;
