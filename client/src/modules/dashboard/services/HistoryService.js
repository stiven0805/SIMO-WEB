/**
 * HistoryService
 * ---------------
 */

import { httpClient } from '../../../shared/utils/httpClient.js';

class HistoryService {
  async fetchHistory() {
    return httpClient.get('/api/solicitudes');
  }

  async fetchHistoryDetail(id) {
    return httpClient.get(`/api/solicitudes/${id}`);
  }
}

export const historyService = new HistoryService();
