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
      const rawItems = res.notificaciones || res.data || res || []
      
      const items = rawItems.map(dbItem => {
        let formattedDate = '--';
        if (dbItem.fecha_envio) {
          const d = new Date(dbItem.fecha_envio);
          formattedDate = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
        }

        const title = dbItem.titulo || 'Notificación';
        const titleLower = title.toLowerCase();
        let color = 'blue';
        let statusColor = 'process';
        let status = 'Recibido';
        let img = 'reciclaje';

        if (titleLower.includes('acept') || titleLower.includes('aprob')) {
          color = 'yellow';
          status = 'Aceptada';
          statusColor = 'complete';
          img = 'reciclaje';
        } else if (titleLower.includes('cancel') || titleLower.includes('rechaz')) {
          color = 'pink';
          status = 'Cancelada';
          statusColor = 'cancel';
          img = 'reciclaje';
        } else if (titleLower.includes('complet') || titleLower.includes('recib')) {
          color = 'gray';
          status = 'Completado';
          statusColor = 'complete';
          img = 'reciclaje';
        }

        const msgLower = (dbItem.mensaje || '').toLowerCase();
        if (msgLower.includes('celular') || msgLower.includes('teléfono') || msgLower.includes('movil')) {
          img = 'celular inv';
        } else if (msgLower.includes('batería')) {
          img = 'bateria';
        } else if (msgLower.includes('pila')) {
          img = 'pilas';
        } else if (msgLower.includes('tablet') || msgLower.includes('ipad')) {
          img = 'tablet';
        } else if (msgLower.includes('nevera') || msgLower.includes('refrigerador')) {
          img = 'nevera';
        } else if (msgLower.includes('tv') || msgLower.includes('televisor')) {
          img = 'tv';
        } else if (msgLower.includes('cable')) {
          img = 'cable';
        } else if (msgLower.includes('mause') || msgLower.includes('mouse')) {
          img = 'mouse';
        } else if (msgLower.includes('licuadora')) {
          img = 'licuadora';
        } else if (msgLower.includes('laptop') || msgLower.includes('portátil') || msgLower.includes('computador')) {
          img = 'laptop';
        } else if (msgLower.includes('cargador')) {
          img = 'cargador';
        } else if (msgLower.includes('ventilador')) {
          img = 'ventilador';
        } else if (msgLower.includes('plancha')) {
          img = 'plancha';
        }

        let points = 100;
        const pointsMatch = (dbItem.mensaje || '').match(/(\d+)\s*puntos/i);
        if (pointsMatch) {
          points = parseInt(pointsMatch[1]);
        }

        return {
          id: dbItem.id,
          quantity: '1x',
          device: title,
          img,
          color,
          destination: dbItem.mensaje || 'Información de solicitud',
          address: '',
          delivery: 'Presencial',
          points,
          date: formattedDate,
          status,
          statusColor,
          code: dbItem.id,
          nit: 'SIMÖ App'
        };
      });

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
