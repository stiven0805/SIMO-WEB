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
import { renderAuthNav, renderFooter, bindAuthNavEvents, bindFooterEvents } from '../../landing/views/shared/landingShared.js'

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

    return `
      <div class="landing">

        ${renderAuthNav('notificaciones')}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="historial-hero">
          ${this._renderHeroDecos()}
          <div class="historial-hero__inner">
            <p class="historial-hero__pre">MIS</p>
            <h1 class="historial-hero__title">Notificaciones</h1>
            <p class="historial-hero__subtitle">Dale clic para más información...</p>
          </div>
        </section>

        <!-- ─── ITEMS ─────────────────────────────────────────── -->
        <section class="historial-items">
          <div class="historial-items__inner">
            ${items.map(item => this._renderItem(item)).join('')}
          </div>
        </section>

        ${renderFooter()}

      </div>
    `
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /**
   * Renderiza decoraciones del hero.
   * @returns {string}
   */
  _renderHeroDecos() {
    return `
      <div class="historial-hero__deco historial-hero__deco--left">
        <svg viewBox="0 0 80 260" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 10 Q10 80 50 130 Q10 180 60 250" stroke="rgba(255,255,255,0.35)" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="historial-hero__deco historial-hero__deco--right">
        <svg viewBox="0 0 80 260" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10 Q70 80 30 130 Q70 180 20 250" stroke="rgba(255,255,255,0.35)" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
    `
  }

  /**
   * Renderiza una tarjeta de notificación.
   * @param {object} item
   * @returns {string}
   */
  _renderItem(item) {
    const icons = { 'Celular': '📱', 'Baterías': '🔋', 'Batería': '🔋', 'Tablet': '📟', 'Laptop': '💻' }
    const icon = icons[item.device] || '📦'
    const flowerSvg = `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <rect x="23" y="3" width="14" height="54" rx="2" fill="#FFCD1C"/>
      <rect x="3" y="23" width="54" height="14" rx="2" fill="#FFCD1C"/>
      <rect x="11" y="11" width="14" height="39" rx="2" fill="#FFCD1C" transform="rotate(45 30 30)"/>
      <rect x="11" y="11" width="39" height="14" rx="2" fill="#FFCD1C" transform="rotate(45 30 30)"/>
      <circle cx="30" cy="30" r="11" fill="#FFCD1C"/>
      <circle cx="30" cy="30" r="8" fill="#DB0076"/>
    </svg>`

    return `
      <div class="notif-card" id="notif-${item.id}">
        <div class="notif-card__device">
          <span class="notif-card__qty">${item.quantity}</span>
          <span class="notif-card__icon">${icon}</span>
          <span class="notif-card__label">${item.device}</span>
        </div>
        <div class="notif-card__info">
          <p class="notif-card__row">Destino: <strong>${item.destination}</strong></p>
          <p class="notif-card__row">Electrodoméstico: ${item.device}</p>
          <p class="notif-card__row">Fecha: ${item.date}</p>
        </div>
        <div class="notif-card__right">
          <div class="notif-card__points">
            ${flowerSvg}
            <span>${item.points}</span>
          </div>
          <p class="notif-card__status notif-card__status--${item.statusColor}">Estado: <strong>${item.status}</strong></p>
        </div>
      </div>
    `
  }

  // ─── Binding ──────────────────────────────────────────────────────────────

  /** @override */
  _bindViewModel() {}

  /** @override */
  _bindEvents() {
    bindAuthNavEvents(this)
    bindFooterEvents(this)
  }
}
