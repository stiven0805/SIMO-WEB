/**
 * LandingViewModel
 * -----------------
 * Maneja el estado y los comandos de la vista de Landing.
 */

import { BaseViewModel } from '../../../core/BaseViewModel.js'
import { LandingModel } from '../models/LandingModel.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

export class LandingViewModel extends BaseViewModel {
  _initState() {
    const model = new LandingModel()
    this.setState({
      title: model.get('title'),
      description: model.get('description'),
    })
  }

  // ─── Comandos ─────────────────────────────────────────────────────────────

  /**
   * Navega a la vista de login publicando un evento global.
   */
  goToLogin() {
    eventBus.emit('landing:goToLogin')
  }
}
