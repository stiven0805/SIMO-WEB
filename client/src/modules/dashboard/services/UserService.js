/**
 * UserService
 * ------------
 */

import { httpClient } from '../../../shared/utils/httpClient.js';

class UserService {
  async fetchProfile() {
    return httpClient.get('/api/usuario/me');
  }

  async updateProfile(data) {
    return httpClient.put('/api/usuario/me', data);
  }

  async fetchPoints() {
    // En el backend principal los puntos vienen dentro del usuario
    const res = await httpClient.get('/api/usuario/me');
    return { puntos: res.usuario?.puntos_verdes || 0 };
  }

  async fetchStats() {
    // El backend principal no tiene un endpoint de stats separado por ahora
    return { dispositivos_reciclados: 0, kg_evitados: 0 };
  }
}

export const userService = new UserService();
