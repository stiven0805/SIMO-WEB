/**
 * history.service.js
 * -------------------
 */

import { BaseService } from '../../core/BaseService.js';
import { pool } from '../../config/db.js';

export class HistoryService extends BaseService {
  async getHistory(userId) {
    const resultado = await pool.query(
      `SELECT s.*, 
              d.nombre as dispositivo_nombre,
              p.nombre as punto_nombre
       FROM solicitud s
       LEFT JOIN dispositivo_tipo d ON s.dispositivo_tipo_id = d.id
       LEFT JOIN punto_reciclaje p ON s.punto_reciclaje_id = p.id
       WHERE s.usuario_id = $1
       ORDER BY s.fecha_solicitud DESC`,
      [userId]
    );

    return { history: resultado.rows };
  }

  async getDetail(userId, requestId) {
    const resultado = await pool.query(
      `SELECT s.*, 
              d.nombre as dispositivo_nombre,
              p.nombre as punto_nombre,
              p.direccion as punto_direccion
       FROM solicitud s
       LEFT JOIN dispositivo_tipo d ON s.dispositivo_tipo_id = d.id
       LEFT JOIN punto_reciclaje p ON s.punto_reciclaje_id = p.id
       WHERE s.id = $1 AND s.usuario_id = $2`,
      [requestId, userId]
    );

    if (resultado.rows.length === 0) {
      this.throwNotFound('Registro de historial');
    }

    return { detail: resultado.rows[0] };
  }
}
