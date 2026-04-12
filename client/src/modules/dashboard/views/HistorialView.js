/**
 * HistorialView
 * --------------
 * Vista del historial de reciclaje del usuario autenticado.
 * Layout: Nav auth + Hero azul + Cards de historial + Footer.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con HistorialViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { HistorialViewModel } from '../viewmodels/HistorialViewModel.js'
import { renderAuthNav, renderFooter, bindAuthNavEvents, bindFooterEvents } from '../../landing/views/shared/landingShared.js'

export class HistorialView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new HistorialViewModel()
    super({ ...options, viewModel })
  }

  /**
   * Genera el HTML completo de la vista de Historial.
   * @returns {string}
   */
  render() {
    const items = this._viewModel.getState('items') || []

    return `
      <div class="landing">

        ${renderAuthNav('historial')}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="historial-hero">
          ${this._renderHeroDecos()}
          <div class="historial-hero__inner">
            <p class="historial-hero__pre">MI</p>
            <h1 class="historial-hero__title">Historial</h1>
          </div>
        </section>

        <!-- ─── ITEMS ─────────────────────────────────────────── -->
        <section class="historial-items">
          <div class="historial-items__inner" id="historial-list">
            ${items.map(item => this._renderItem(item)).join('')}
          </div>
        </section>

        ${renderFooter()}

      </div>
    `
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /**
   * Renderiza las decoraciones del hero (líneas curvas blancas).
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
   * Renderiza una tarjeta de historial.
   * @param {object} item
   * @returns {string}
   */
  _renderItem(item) {
    const icons = { 'Celular': '📱', 'Batería': '🔋', 'Tablet': '📟', 'Laptop': '💻' }
    const icon = icons[item.device] || '📦'

    return `
      <div class="historial-card historial-card--${item.color}">
        <div class="historial-card__device">
          <span class="historial-card__qty">${item.quantity}</span>
          <span class="historial-card__icon">${icon}</span>
          <span class="historial-card__label">${item.device}</span>
        </div>
        <div class="historial-card__info">
          <p class="historial-card__company">${item.company} <span class="historial-card__status-text">${item.status}</span></p>
          <p class="historial-card__desc">${item.statusDesc}</p>
          <p class="historial-card__date">Fecha: ${item.date}</p>
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
