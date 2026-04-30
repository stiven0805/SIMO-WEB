/**
 * UserService
 * ------------
 */

import { httpClient } from '../../../shared/utils/httpClient.js';

class UserService {
  async fetchProfile() {
    return httpClient.get('/api/user/profile');
  }

  async updateProfile(data) {
    return httpClient.patch('/api/user/profile', data);
  }

  async fetchPoints() {
    return httpClient.get('/api/user/points');
  }

  async fetchStats() {
    return httpClient.get('/api/user/stats');
  }
}

export const userService = new UserService();
