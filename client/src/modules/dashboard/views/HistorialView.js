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
import { bindAuthNavEvents, bindFooterEvents } from '../../landing/views/shared/landingShared.js'
import { AuthNav, SharedFooter, HeroDecos } from '../../../shared/components/Layouts.js'
import { HistorialCard } from '../../../shared/components/Cards.js'

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

        ${AuthNav('historial')}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="historial-hero">
          ${HeroDecos()}
          <div class="historial-hero__inner">
            <p class="historial-hero__pre">MI</p>
            <h1 class="historial-hero__title">Historial</h1>
          </div>
        </section>

        <!-- ─── ITEMS ─────────────────────────────────────────── -->
        <section class="historial-items">
          <div class="historial-items__inner" id="historial-list">
            ${items.map(item => HistorialCard(item)).join('')}
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
