/**
 * notifications.controller.js
 * ----------------------------
 */

import { BaseController } from '../../core/BaseController.js';
import { NotificationsService } from './notifications.service.js';

const notificationsService = new NotificationsService();

export class NotificationsController extends BaseController {
  async getNotifications(req, res) {
    try {
      const result = await notificationsService.getNotifications(req.usuario.id);
      return this.ok(res, result);
    } catch (error) {
      return this.serverError(res, error);
    }
  }

  async markAsRead(req, res) {
    try {
      const result = await notificationsService.markAsRead(req.usuario.id, req.params.id);
      return this.ok(res, result);
    } catch (error) {
      if (error.statusCode === 404) return this.notFound(res, error.message);
      return this.serverError(res, error);
    }
  }
}
