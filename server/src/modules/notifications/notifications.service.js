/**
 * notifications.service.js
 * -------------------------
 */

import { BaseService } from '../../core/BaseService.js';
import { pool } from '../../config/db.js';

export class NotificationsService extends BaseService {
  async getNotifications(userId) {
    const resultado = await pool.query(
      `SELECT id, titulo, mensaje, leido, fecha_envio
       FROM notificacion
       WHERE usuario_id = $1
       ORDER BY fecha_envio DESC`,
      [userId]
    );

    return { notificaciones: resultado.rows };
  }

  async markAsRead(userId, notificationId) {
    const resultado = await pool.query(
      `UPDATE notificacion 
       SET leido = true 
       WHERE id = $1 AND usuario_id = $2
       RETURNING id`,
      [notificationId, userId]
    );

    if (resultado.rows.length === 0) {
      this.throwNotFound('Notificación');
    }

    return { mensaje: 'Notificación marcada como leída', id: notificationId };
  }
}
