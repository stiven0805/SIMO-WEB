/**
 * auth.controller.js
 * -------------------
 * Controlador del módulo de autenticación.
 */

import { BaseController } from '../../core/BaseController.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService();

export class AuthController extends BaseController {
  /**
   * POST /api/auth/login
   */
  async login(req, res) {
    const { valid, missing } = this.validateRequired(req.body, ['nombre', 'password']);
    if (!valid) {
      return this.badRequest(res, `Campos requeridos faltantes: ${missing.join(', ')}`);
    }

    try {
      const result = await authService.login(req.body);
      return this.ok(res, result, 'Login exitoso.');
    } catch (error) {
      if (error.statusCode === 401) return this.unauthorized(res, error.message);
      return this.serverError(res, error);
    }
  }

  /**
   * POST /api/auth/register
   */
  async register(req, res) {
    const { valid, missing } = this.validateRequired(req.body, ['nombre', 'email', 'password', 'cedula']);
    if (!valid) {
      return this.badRequest(res, `Campos requeridos faltantes: ${missing.join(', ')}`);
    }

    try {
      const result = await authService.register(req.body);
      return this.created(res, result);
    } catch (error) {
      if (error.statusCode === 409 || error.statusCode === 400) return this.badRequest(res, error.message);
      return this.serverError(res, error);
    }
  }

  /**
   * POST /api/auth/logout
   */
  async logout(req, res) {
    // Para JWT normal en localStorage, el cliente simplemente borra el token.
    return this.noContent(res);
  }
}
