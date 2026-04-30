/**
 * AuthService
 * ------------
 * Capa de acceso a datos del módulo AUTH.
 */

import { httpClient } from '../../../shared/utils/httpClient.js';

class AuthService {
  async login(credentials) {
    // Note: credentials must have 'nombre' instead of 'email' based on backend
    return httpClient.post('/api/auth/login', credentials);
  }

  async register(userData) {
    return httpClient.post('/api/auth/register', userData);
  }

  async logout() {
    return httpClient.post('/api/auth/logout', {});
  }
}

export const authService = new AuthService();
