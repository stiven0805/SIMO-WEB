/**
 * LandingStore
 * -------------
 * Single source of truth para la landing.
 */

class LandingStore {
  constructor() {
    this.stats = null
  }

  setStats(stats) {
    this.stats = stats
  }
}

export const landingStore = new LandingStore()
