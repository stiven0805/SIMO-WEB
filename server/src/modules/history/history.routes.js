/**
 * history.routes.js
 * ------------------
 */

import { Router } from 'express';
import { HistoryController } from './history.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();
const historyController = new HistoryController();

router.use(authMiddleware);

router.get('/', (req, res) => historyController.getHistory(req, res));
router.get('/:id', (req, res) => historyController.getDetail(req, res));

export default router;
