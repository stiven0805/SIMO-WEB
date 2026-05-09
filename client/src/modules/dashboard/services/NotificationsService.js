/**
 * NotificationsService
 * ---------------------
 */

import { httpClient } from '../../../shared/utils/httpClient.js';

class NotificationsService {
  async fetchNotifications() {
    return httpClient.get('/api/notificaciones');
  }

  async markAsRead(id) {
    return httpClient.put(`/api/notificaciones/${id}/leer`, {});
  }
}

export const notificationsService = new NotificationsService();
