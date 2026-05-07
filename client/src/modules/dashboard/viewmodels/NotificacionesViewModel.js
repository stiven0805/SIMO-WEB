/**
 * NotificacionesViewModel
 * ------------------------
 * Gestiona el estado de la vista de Notificaciones.
 */

import { BaseViewModel } from '../../../core/BaseViewModel.js'

export class NotificacionesViewModel extends BaseViewModel {
  /** @override */
  _initState() {
    this.setState({
      items: [
        { 
          id: 1, 
          quantity: '1x', 
          device: 'Celular', 
          img: 'celular inv', 
          color: 'gray', 
          destination: 'Ecotech', 
          address: 'Calle 10 #43-12, Medellín',
          delivery: 'Lo llevas tú',
          points: 1780, 
          date: '04/03/2026', 
          code: '5542',
          nit: 'NIT:0129219',
          status: 'En proceso', 
          statusColor: 'process' 
        },
        { 
          id: 2, 
          quantity: '2x', 
          device: 'Celular', 
          img: 'celular inv', 
          color: 'gray', 
          destination: 'Monterrey', 
          address: 'Cll 53 #45-102, Medellín',
          delivery: 'Lo llevas tú',
          points: 1150, 
          date: '04/03/2026', 
          code: '8821',
          nit: 'NIT:0129219',
          status: 'En proceso', 
          statusColor: 'process' 
        },
        { 
          id: 3, 
          quantity: '21x', 
          device: 'Baterías', 
          img: 'bateria', 
          color: 'yellow', 
          destination: 'Electro Healt', 
          address: 'Calle 65 #15-93, Medellín',
          delivery: 'Lo llevas tú',
          points: 1100, 
          date: '03/02/2026', 
          code: '6645',
          nit: 'NIT:0129219',
          status: 'Completo', 
          statusColor: 'complete' 
        },
      ],
      selectedItem: null,
    })
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
