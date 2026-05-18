/**
 * NotificacionesView
 * -------------------
 * Vista de notificaciones del usuario autenticado.
 * Layout: Nav auth + Hero azul + Cards + Footer.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con NotificacionesViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { NotificacionesViewModel } from '../viewmodels/NotificacionesViewModel.js'
import { bindAuthNavEvents, bindFooterEvents } from '../../landing/views/shared/landingShared.js'
import { AuthNav, SharedFooter, HeroDecos } from '../../../shared/components/Layouts.js'
import { NotificacionCard } from '../../../shared/components/Cards.js'

import flor from '../../../../assets/styles/images/flor.png';

export class NotificacionesView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new NotificacionesViewModel()
    super({ ...options, viewModel })
  }

  /**
   * Genera el HTML completo de la vista de Notificaciones.
   * @returns {string}
   */
  render() {
    const items = this._viewModel.getState('items') || []
    const selectedItem = this._viewModel.getState('selectedItem')

    return `
      <div class="landing">

        ${AuthNav('notificaciones', 'blue')}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="historial-hero">
          ${HeroDecos()}
          <div class="historial-hero__inner">
            <p class="historial-hero__pre">MIS</p>
            <h1 class="historial-hero__title">Notificaciones</h1>
            <p class="historial-hero__subtitle">Dale clic para más información...</p>
          </div>
        </section>

        <!-- ─── CONTENIDO ─────────────────────────────────────── -->
        <section class="historial-items">
          <div class="historial-items__inner">
            
            ${selectedItem ? `
              <!-- VISTA DETALLE -->
              <div class="notif-detalle">
                <button class="notif-detalle__back" id="btn-back-notif">← Volver a la lista</button>
                
                <div class="notif-detalle__grid">
                  <!-- Columna 1: Dispositivo + Puntos -->
                  <div class="notif-detalle__col-left">
                    <div class="historial-card historial-card--${selectedItem.color}" style="margin-bottom: 2rem; width: 100%;">
                      <div class="historial-card__device" style="min-width: 140px;">
                        <span class="historial-card__qty">${selectedItem.quantity}</span>
                        <div class="historial-card__img-container">
                          <img src="./assets/styles/images/${selectedItem.img}.png" alt="${selectedItem.device}" class="historial-card__img" />
                        </div>
                        <span class="historial-card__label">${selectedItem.device}</span>
                      </div>
                    </div>

                    <div class="notif-detalle__points-badge">
                      <img src=${flor} alt="Puntos" class="notif-detalle__flower" />
                      <span>${selectedItem.points}</span>
                    </div>
                  </div>

                  <!-- Columna 2: Info central -->
                  <div class="notif-detalle__col-center">
                    <div class="notif-detalle__info-block">
                      <p><strong>Destino:</strong> ${selectedItem.destination}</p>
                      <p>${selectedItem.address}</p>
                      <p><strong>Cantidad:</strong> ${selectedItem.quantity}</p>
                      <p><strong>Forma de entrega:</strong></p>
                      <p class="notif-detalle__delivery">${selectedItem.delivery}</p>
                    </div>

                    <button class="notif-detalle__status-btn notif-detalle__status-btn--${selectedItem.statusColor}">
                      ${selectedItem.status}
                    </button>
                  </div>

                  <!-- Columna 3: Card de código -->
                  <div class="notif-detalle__col-right">
                    <div class="notif-detalle__code-card">
                      <h3 class="notif-detalle__code-title">¡Solicitud aceptada!</h3>
                      <p class="notif-detalle__code-val">CODE: ${selectedItem.code}</p>
                      <p class="notif-detalle__code-date">10 / marzo / 2026 - ${selectedItem.nit}</p>
                      
                      <div class="notif-detalle__code-list">
                        <p><strong>Dispositivo:</strong> ${selectedItem.device}</p>
                        <p><strong>Fecha de entrega:</strong> ${selectedItem.date}</p>
                        <p><strong>Puntos ganados:</strong> ${selectedItem.points} Puntos</p>
                      </div>

                      <p class="notif-detalle__code-note">
                        NOTA: Los puntos se otorgarán cuando el dispositivo sea recibido en el punto de reciclaje
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ` : `
              <!-- VISTA LISTA -->
              <div id="notif-list" style="width: 100%;">
                ${items.length > 0 ? 
                  items.map(item => NotificacionCard(item)).join('') :
                  `<div class="empty-state" style="text-align: center; padding: 4rem 2rem; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1); width: 100%;">
                     <div style="font-size: 3rem; margin-bottom: 1rem;">🔔</div>
                     <h3 style="font-size: 1.3rem; color: #fff; margin-bottom: 0.5rem;">No tienes notificaciones</h3>
                     <p style="font-size: 0.95rem; color: #aaa; max-width: 400px; margin: 0 auto;">Aquí aparecerán los avisos y actualizaciones de tus solicitudes de reciclaje en tiempo real.</p>
                   </div>`
                }
              </div>
            `}

          </div>
        </section>

        ${SharedFooter()}

      </div>
    `
  }

  // ─── Binding ──────────────────────────────────────────────────────────────

  /** @override */
  _bindViewModel() {
    this._subscribe('items', () => {
      this.refresh()
    })
    this._subscribe('selectedItem', () => {
      this.refresh()
    })
  }

  /** @override */
  _bindEvents() {
    bindAuthNavEvents(this)
    bindFooterEvents(this)

    // Eventos de selección de card
    const list = this.$('#notif-list')
    if (list) {
      list.querySelectorAll('.notif-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = parseInt(card.id.split('-')[1])
          this._viewModel.selectItem(id)
        })
      })
    }

    // Evento volver
    const btnBack = this.$('#btn-back-notif')
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        this._viewModel.clearSelection()
      })
    }
  }
}
