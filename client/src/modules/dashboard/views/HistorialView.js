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

        ${AuthNav('historial', 'blue')}

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
          <div class="historial-items__inner" id="historial-list" style="width: 100%;">
            ${items.length > 0 ? 
              items.map(item => HistorialCard(item)).join('') :
              `<div class="empty-state" style="text-align: center; padding: 4rem 2rem; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1); width: 100%;">
                 <div style="font-size: 3rem; margin-bottom: 1rem;">♻️</div>
                 <h3 style="font-size: 1.3rem; color: #fff; margin-bottom: 0.5rem;">Aún no tienes solicitudes en tu historial</h3>
                 <p style="font-size: 0.95rem; color: #aaa; max-width: 440px; margin: 0 auto;">Tus solicitudes para reciclar dispositivos aparecerán listadas aquí una vez que realices una entrega.</p>
               </div>`
            }
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
  }

  /** @override */
  _bindEvents() {
    bindAuthNavEvents(this)
    bindFooterEvents(this)
  }
}
