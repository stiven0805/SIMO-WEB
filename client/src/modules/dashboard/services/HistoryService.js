/**
 * HistoryService
 * ---------------
 */

import { httpClient } from '../../../shared/utils/httpClient.js';

class HistoryService {
  async fetchHistory() {
    return httpClient.get('/api/history');
  }

  async fetchHistoryDetail(id) {
    return httpClient.get(`/api/history/${id}`);
  }
}

export const historyService = new HistoryService();
