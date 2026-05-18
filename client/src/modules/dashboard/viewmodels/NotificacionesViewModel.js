/**
 * NotificacionesViewModel
 * ------------------------
 * Gestiona el estado de la vista de Notificaciones.
 */

import { BaseViewModel } from '../../../core/BaseViewModel.js'
import { notificationsService } from '../services/NotificationsService.js'

export class NotificacionesViewModel extends BaseViewModel {
  /** @override */
  _initState() {
    this.setState({
      items: [],
      selectedItem: null,
      isLoading: false
    })
  }

  /** @override */
  async onMount() {
    this.setState({ isLoading: true })
    try {
      const res = await notificationsService.fetchNotifications()
      const items = res.notificaciones || res.data || res || []
      this.setState({ items, isLoading: false })
    } catch (err) {
      console.warn('Error cargando notificaciones reales:', err)
      this.setState({ items: [], isLoading: false })
    }
  }

  /**
   * Selecciona una notificación para ver el detalle.
   * @param {number} id 
   */
  selectItem(id) {
    const item = this.getState('items').find(i => i.id === id)
    if (item) {
      this.setState({ selectedItem: item })
    }
  }

  /**
   * Limpia la selección para volver a la lista.
   */
  clearSelection() {
    this.setState({ selectedItem: null })
  }
}
