/**
 * HistorialViewModel
 * -------------------
 * Gestiona el estado de la vista de Historial de reciclaje.
 */

import { BaseViewModel } from '../../../core/BaseViewModel.js'
import { historyService } from '../services/HistoryService.js'

export class HistorialViewModel extends BaseViewModel {
  /** @override */
  _initState() {
    this.setState({
      items: [],
      isLoading: false
    })
  }

  /** @override */
  async onMount() {
    this.setState({ isLoading: true })
    try {
      const res = await historyService.fetchHistory()
      const items = res.history || res.solicitudes || res.data || res || []
      this.setState({ items, isLoading: false })
    } catch (err) {
      console.warn('Error cargando historial real:', err)
      this.setState({ items: [], isLoading: false })
    }
  }
}
