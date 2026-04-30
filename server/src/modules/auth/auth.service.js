/**
 * auth.service.js
 * ----------------
 * Lógica de negocio del módulo de autenticación.
 */

import { BaseService } from '../../core/BaseService.js';
import { pool } from '../../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService extends BaseService {
  /**
   * Autentica a un usuario con sus credenciales.
   * @param {{ nombre: string, password: string }} credentials
   * @returns {Promise<{ user: object, token: string }>}
   */
  async login(credentials) {
    const { nombre, password } = credentials;

    const resultado = await pool.query('SELECT * FROM usuario WHERE nombre = $1 OR email = $1', [nombre]);

    if (resultado.rows.length === 0) {
      this.throwUnauthorized('Credenciales incorrectas.');
    }

    const user = resultado.rows[0];
    const passwordValido = await bcrypt.compare(password, user.password);

    if (!passwordValido) {
      this.throwUnauthorized('Credenciales incorrectas.');
    }

    const token = this._generateToken(user);

    return {
      user: this._sanitizeUser(user),
      token,
    };
  }

  /**
   * Registra un nuevo usuario.
   * @param {{ nombre: string, email: string, password: string, cedula: string, telefono: string, direccion: string }} userData
   * @returns {Promise<{ user: object, token: string }>}
   */
  async register(userData) {
    const { nombre, email, password, cedula, telefono, direccion } = userData;

    // Verificar si el email o el nombre ya existen
    const existe = await pool.query(
      'SELECT id, email FROM usuario WHERE email = $1 OR nombre = $2',
      [email, nombre]
    );

    if (existe.rows.length > 0) {
      const u = existe.rows[0];
      if (u.email === email) {
        this.throwError('El email ya está registrado.', 409);
      }
      this.throwError('El nombre de usuario ya está registrado.', 409);
    }

    const hash = await bcrypt.hash(password, 10);

    const resultado = await pool.query(
      `INSERT INTO usuario (nombre, email, password, cedula, telefono, direccion, rol)
       VALUES ($1, $2, $3, $4, $5, $6, 'reciclador')
       RETURNING id, nombre, email, cedula, telefono, direccion, puntos_verdes, rol, created_at`,
      [nombre, email, hash, cedula, telefono || null, direccion || null]
    );

    const newUser = resultado.rows[0];
    const token = this._generateToken(newUser);

    return {
      user: this._sanitizeUser(newUser),
      token,
    };
  }

  // ─── Métodos privados ─────────────────────────────────────────────────────

  /**
   * @param {object} user
   * @returns {string}
   */
  _generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET || 'super-secret-key-for-dev',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  }

  /**
   * Elimina campos sensibles antes de enviar el usuario al cliente.
   * @param {object} user
   * @returns {object}
   */
  _sanitizeUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
