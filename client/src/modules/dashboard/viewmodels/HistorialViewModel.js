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
      const rawItems = res.history || res.solicitudes || res.data || res || []
      
      const items = rawItems.map(dbItem => {
        const devName = (dbItem.dispositivo_nombre || '').toLowerCase();
        let img = 'celular inv';
        let color = 'gray';
        
        if (devName.includes('bater')) {
          img = 'bateria';
          color = 'yellow';
        } else if (devName.includes('pila')) {
          img = 'pilas';
          color = 'yellow';
        } else if (devName.includes('tab') || devName.includes('ipad')) {
          img = 'tablet';
          color = 'pink';
        } else if (devName.includes('never') || devName.includes('refri')) {
          img = 'nevera';
          color = 'blue';
        } else if (devName.includes('tv') || devName.includes('tele')) {
          img = 'tv';
          color = 'blue';
        } else if (devName.includes('cable')) {
          img = 'cable';
          color = 'gray';
        } else if (devName.includes('mause') || devName.includes('mouse')) {
          img = 'mouse';
          color = 'gray';
        } else if (devName.includes('licua')) {
          img = 'licuadora';
          color = 'yellow';
        } else if (devName.includes('laptop') || devName.includes('portatil') || devName.includes('computador')) {
          img = 'laptop';
          color = 'pink';
        } else if (devName.includes('cargador') || devName.includes('adapta')) {
          img = 'cargador';
          color = 'gray';
        } else if (devName.includes('ventilador') || devName.includes('abanico')) {
          img = 'ventilador';
          color = 'blue';
        } else if (devName.includes('plancha')) {
          img = 'plancha';
          color = 'pink';
        } else if (devName.includes('control') || devName.includes('mando')) {
          img = 'control';
          color = 'gray';
        } else if (devName.includes('micro') || devName.includes('horno')) {
          img = 'microondas';
          color = 'yellow';
        }

        let formattedDate = '--';
        if (dbItem.fecha_solicitud) {
          const d = new Date(dbItem.fecha_solicitud);
          formattedDate = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
        }

        const estado = dbItem.estado || 'En proceso';
        let statusDesc = 'Tu reciclaje fue aceptado por el punto seleccionado.';
        if (estado === 'Completado' || estado === 'Entrega registrada') {
          statusDesc = 'El punto de reciclaje confirmó la recepción de tu dispositivo. Puntos acumulados.';
        } else if (estado === 'Cancelado' || estado === 'Solicitud cancelada') {
          statusDesc = 'Tu solicitud fue cancelada. Puedes crear una nueva cuando lo desees.';
        }

        return {
          id: dbItem.id,
          quantity: dbItem.cantidad ? `${dbItem.cantidad}x` : '1x',
          device: dbItem.dispositivo_nombre || 'Dispositivo',
          img,
          color,
          company: dbItem.punto_nombre || 'Punto de Reciclaje',
          status: estado,
          statusDesc,
          date: formattedDate
        };
      });

      this.setState({ items, isLoading: false })
    } catch (err) {
      console.warn('Error cargando historial real:', err)
      this.setState({ items: [], isLoading: false })
    }
  }
}
