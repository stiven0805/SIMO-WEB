/**
 * LandingViewModel
 * -----------------
 * Maneja el estado y los comandos de la vista de Landing SIMÖ.
 */

import { BaseViewModel } from '../../../core/BaseViewModel.js'
import { LandingModel } from '../models/LandingModel.js'
import { eventBus } from '../../../shared/utils/eventBus.js'

export class LandingViewModel extends BaseViewModel {
  /**
   * Inicializa el estado con los datos del LandingModel.
   */
  _initState() {
    const model = new LandingModel()
    this.setState({
      title: model.get('title'),
      greeting: model.get('greeting'),
      description: model.get('description'),
      offers: model.get('offers'),
      collaborators: model.get('collaborators'),
    })
  }

  // ─── Comandos ─────────────────────────────────────────────────────────────

  /**
   * Navega a la vista de login publicando un evento global.
   */
  goToLogin() {
    eventBus.emit('landing:goToLogin')
  }

  /**
   * Navega a la descarga de la app.
   */
  goToDownload() {
    eventBus.emit('landing:goToDownload')
  }
}
