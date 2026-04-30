/**
 * history.controller.js
 * ----------------------
 */

import { BaseController } from '../../core/BaseController.js';
import { HistoryService } from './history.service.js';

const historyService = new HistoryService();

export class HistoryController extends BaseController {
  async getHistory(req, res) {
    try {
      const result = await historyService.getHistory(req.usuario.id);
      return this.ok(res, result);
    } catch (error) {
      return this.serverError(res, error);
    }
  }

  async getDetail(req, res) {
    try {
      const result = await historyService.getDetail(req.usuario.id, req.params.id);
      return this.ok(res, result);
    } catch (error) {
      if (error.statusCode === 404) return this.notFound(res, error.message);
      return this.serverError(res, error);
    }
  }
}
