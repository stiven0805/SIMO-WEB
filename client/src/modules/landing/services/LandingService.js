/**
 * LandingService
 * ---------------
 * Servicios de la landing page, si necesita consumir API pública.
 */

import { httpClient } from '../../../shared/utils/httpClient.js'

export class LandingService {
  // Ej: async fetchPublicStats() { return await httpClient.get('/stats') }
}

export const landingService = new LandingService()
