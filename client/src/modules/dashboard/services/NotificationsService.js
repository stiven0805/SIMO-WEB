/**
 * NotificationsService
 * ---------------------
 */

import { httpClient } from '../../../shared/utils/httpClient.js';

class NotificationsService {
  async fetchNotifications() {
    return httpClient.get('/api/notifications');
  }

  async markAsRead(id) {
    return httpClient.patch(`/api/notifications/${id}/read`, {});
  }
}

export const notificationsService = new NotificationsService();
