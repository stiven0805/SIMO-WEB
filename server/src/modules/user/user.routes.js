/**
 * user.routes.js
 * ---------------
 */

import { Router } from 'express';
import { UserController } from './user.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();
const userController = new UserController();

router.use(authMiddleware);

router.get('/profile', (req, res) => userController.getProfile(req, res));
router.patch('/profile', (req, res) => userController.updateProfile(req, res));
router.get('/points', (req, res) => userController.getPoints(req, res));
router.get('/stats', (req, res) => userController.getStats(req, res));

export default router;
