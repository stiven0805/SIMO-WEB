/**
 * QuienesSomosViewModel
 * ──────────────────────
 * Maneja el estado y los comandos de la vista "Quiénes somos".
 */

import { BaseViewModel } from '../../../core/BaseViewModel.js'

export class QuienesSomosViewModel extends BaseViewModel {
  /**
   * Inicializa el estado de la página Quiénes somos.
   */
  _initState() {
    this.setState({
      pageTitle: 'Quiénes somos — SIMÖ',
    })
  }
}
