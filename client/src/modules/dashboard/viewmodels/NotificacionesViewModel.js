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
        { id: 1, quantity: '1x', device: 'Celular', destination: 'Ecotech', points: 1780, date: '04/03/2026', status: 'En proceso', statusColor: 'process' },
        { id: 2, quantity: '2x', device: 'Celular', destination: 'Monterrey', points: 1150, date: '04/03/2026', status: 'En proceso', statusColor: 'process' },
        { id: 3, quantity: '21x', device: 'Baterías', destination: 'Electro Healt', points: 1100, date: '03/02/2026', status: 'Completo', statusColor: 'complete' },
      ],
    })
  }
}
