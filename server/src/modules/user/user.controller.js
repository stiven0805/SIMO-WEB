/**
 * user.controller.js
 * -------------------
 */

import { BaseController } from '../../core/BaseController.js';
import { UserService } from './user.service.js';

const userService = new UserService();

export class UserController extends BaseController {
  async getProfile(req, res) {
    try {
      const result = await userService.getProfile(req.usuario.id);
      return this.ok(res, result);
    } catch (error) {
      if (error.statusCode === 404) return this.notFound(res, error.message);
      return this.serverError(res, error);
    }
  }

  async updateProfile(req, res) {
    try {
      const result = await userService.updateProfile(req.usuario.id, req.body);
      return this.ok(res, result);
    } catch (error) {
      return this.serverError(res, error);
    }
  }

  async getPoints(req, res) {
    try {
      const result = await userService.getPoints(req.usuario.id);
      return this.ok(res, result);
    } catch (error) {
      if (error.statusCode === 404) return this.notFound(res, error.message);
      return this.serverError(res, error);
    }
  }

  async getStats(req, res) {
    try {
      const result = await userService.getStats(req.usuario.id);
      return this.ok(res, result);
    } catch (error) {
      return this.serverError(res, error);
    }
  }
}
