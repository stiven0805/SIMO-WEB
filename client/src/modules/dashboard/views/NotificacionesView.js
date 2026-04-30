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

        ${AuthNav('notificaciones')}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="historial-hero">
          ${HeroDecos()}
          <div class="historial-hero__inner">
            <p class="historial-hero__pre">MIS</p>
            <h1 class="historial-hero__title">Notificaciones</h1>
            <p class="historial-hero__subtitle">Dale clic para más información...</p>
          </div>
        </section>

        <!-- ─── ITEMS ─────────────────────────────────────────── -->
        <section class="historial-items">
          <div class="historial-items__inner">
            ${items.map(item => NotificacionCard(item)).join('')}
          </div>
        </section>

        ${SharedFooter()}

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
