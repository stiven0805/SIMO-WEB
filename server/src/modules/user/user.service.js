/**
 * user.service.js
 * ----------------
 */

import { BaseService } from '../../core/BaseService.js';
import { pool } from '../../config/db.js';

export class UserService extends BaseService {
  async getProfile(userId) {
    const resultado = await pool.query(
      `SELECT id, nombre, email, cedula, telefono, direccion, puntos_verdes, rol, created_at
       FROM usuario WHERE id = $1`,
      [userId]
    );

    if (resultado.rows.length === 0) {
      this.throwNotFound('Usuario');
    }

    return { usuario: resultado.rows[0] };
  }

  async updateProfile(userId, updateData) {
    const { nombre, telefono, direccion } = updateData;

    const resultado = await pool.query(
      `UPDATE usuario
       SET nombre    = COALESCE($1, nombre),
           telefono  = COALESCE($2, telefono),
           direccion = COALESCE($3, direccion)
       WHERE id = $4
       RETURNING id, nombre, email, cedula, telefono, direccion, puntos_verdes, rol`,
      [nombre, telefono, direccion, userId]
    );

    return { usuario: resultado.rows[0] };
  }

  async getPoints(userId) {
    const resultado = await pool.query(
      `SELECT puntos_verdes FROM usuario WHERE id = $1`,
      [userId]
    );

    if (resultado.rows.length === 0) {
      this.throwNotFound('Usuario');
    }

    return { puntos: resultado.rows[0].puntos_verdes || 0 };
  }

  async getStats(userId) {
    // Calculamos el número de dispositivos y kg reciclados basados en las solicitudes aprobadas.
    // Asumimos que la tabla "solicitud" se cruza con "dispositivo_tipo" el cual podría tener un campo "peso_kg".
    // Como el backend antiguo no tenía peso explícito, por ahora multiplicamos la cantidad por un estimado o traemos los datos reales.
    // Para simplificar, obtenemos la cuenta total de solicitudes en estado completado o similar.
    
    // NOTA: Ajustar query cuando la base de datos de postgres esté lista.
    const resultado = await pool.query(
      `SELECT 
         COUNT(*) as total_dispositivos
       FROM solicitud s
       WHERE s.usuario_id = $1 AND s.estado = 'completado'`,
      [userId]
    );

    const stats = resultado.rows[0];
    
    // Mapeo visual para el frontend: 
    // "Has reciclado X dispositivos"
    // "Evitaste Y kg de residuos electrónicos"
    // Asumiremos un estimado temporal de kg = dispositivos * 4 si no hay campo en BD.
    
    return {
      dispositivos_reciclados: parseInt(stats.total_dispositivos, 10),
      kg_evitados: parseInt(stats.total_dispositivos, 10) * 4, // Reemplazar con SUM(peso_kg) cuando exista en DB
    };
  }
}
