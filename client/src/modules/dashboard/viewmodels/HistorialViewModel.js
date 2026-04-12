/**
 * HistorialViewModel
 * -------------------
 * Gestiona el estado de la vista de Historial de reciclaje.
 */

import { BaseViewModel } from '../../../core/BaseViewModel.js'

export class HistorialViewModel extends BaseViewModel {
  /** @override */
  _initState() {
    this.setState({
      items: [
        { id: 1, quantity: '1x', device: 'Celular', color: 'gray', company: 'EcoTech', status: 'Acepto tu solicitud', statusDesc: 'Tu reciclaje fue aceptado por el punto seleccionado.', date: '04/03/2026' },
        { id: 2, quantity: '2x', device: 'Celular', color: 'gray', company: 'Monterrey', status: 'En camino', statusDesc: 'El recolector va camino a tu ubicación.', date: '04/03/2026' },
        { id: 3, quantity: '21x', device: 'Batería', color: 'yellow', company: 'Electro Healt', status: 'Entrega registrada', statusDesc: 'El punto de reciclaje confirmó la recepción de tu dispositivo. Ahora se le acumularon los puntos', date: '03/02/2026' },
        { id: 4, quantity: '1x', device: 'Tablet', color: 'pink', company: 'Machine Tecno', status: 'Solicitud cancelada', statusDesc: 'Tu solicitud a Machine Tecno fue cancelada. Puedes crear una nueva cuando lo desees.', date: '01/13/2026' },
      ],
    })
  }
}
