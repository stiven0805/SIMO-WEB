/**
 * DescargarViewModel
 * ───────────────────
 * Maneja el estado y los comandos de la vista "Descargar".
 */

import { BaseViewModel } from '../../../core/BaseViewModel.js'

export class DescargarViewModel extends BaseViewModel {
  /**
   * Inicializa el estado de la página Descargar.
   */
  _initState() {
    this.setState({
      pageTitle: 'Descargar — SIMÖ',
    })
  }
}
