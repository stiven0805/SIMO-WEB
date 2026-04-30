/**
 * ColaboracionesView
 * -------------------
 * Página pública de Colaboradores SIMÖ.
 * Layout: Hero rosa con logo + 2 secciones de empresas + Footer.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con ColaboracionesViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { ColaboracionesViewModel } from '../viewmodels/ColaboracionesViewModel.js'
import { bindNavEvents, bindFooterEvents } from './shared/landingShared.js'
import { PublicNav, SharedFooter, ColabsHeroDecos } from '../../../shared/components/Layouts.js'
import { ColabLogo } from '../../../shared/components/Cards.js'

export class ColaboracionesView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new ColaboracionesViewModel()
    super({ ...options, viewModel })
  }

  /**
   * Genera el HTML completo de la página de Colaboradores.
   * @returns {string}
   */
  render() {
    return `
      <div class="landing">

        ${PublicNav('colaboraciones')}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="colabs-hero">
          ${ColabsHeroDecos()}
          <div class="colabs-hero__inner">
            <p class="colabs-hero__logo-text">SIMÖ</p>
            <h1 class="colabs-hero__title">Colaboradores SIMÖ</h1>
            <p class="colabs-hero__desc">
              En esta sección encontrarás las <strong>empresas y organizaciones</strong> que hacen posible el
              ecosistema de SIMÖ. Con tu participación, la aplicación puede ofrecer el reciclaje
              electrónico y ofrecer beneficios a quienes forma parte de esta iniciativa.
            </p>
          </div>
        </section>

        <!-- ─── EMPRESAS QUE RECOMPENSAN ─────────────────────── -->
        <section class="colabs-section">
          <div class="colabs-section__inner">
            <div class="colabs-card">
              <h2 class="colabs-card__title">Empresas que recompensan</h2>
              <p class="colabs-card__desc">
                Estas empresas apoyan la iniciativa ofreciendo beneficios, descuentos y recompensas a los
                usuarios que reciclan sus dispositivos electrónicos a través de SIMÖ. Tu participación impulsa
                una cultura más responsable con la tecnología y el medio ambiente.
              </p>
              <div class="colabs-card__grid">
                ${ColabLogo({ name: 'H&M', type: 'hm' })}
                ${ColabLogo({ name: 'KOAJ', type: 'koaj' })}
                ${ColabLogo({ name: 'verdeo', type: 'verdeo' })}
                ${ColabLogo({ name: 'falabella.', type: 'falabella' })}
                ${ColabLogo({ name: '⬛ Alkatronic<br><small>professional</small>', type: 'alkatronic' })}
                ${ColabLogo({ name: "Betty's<br>bowls", type: 'bettys' })}
                ${ColabLogo({ name: 'Ⓟ Puntos<br>Colombia', type: 'puntos' })}
                ${ColabLogo({ name: 'JUMBO', type: 'jumbo' })}
                ${ColabLogo({ name: '∼elo∼', type: 'elo' })}
              </div>
            </div>
          </div>
        </section>

        <!-- ─── EMPRESAS DE RECOLECCIÓN ───────────────────────── -->
        <section class="colabs-section colabs-section--last">
          <div class="colabs-section__inner">
            <div class="colabs-card">
              <h2 class="colabs-card__title">Empresas de recolección</h2>
              <p class="colabs-card__desc">
                Estas organizaciones están encargadas de recibir, clasificar y gestionar los
                dispositivos electrónicos que se reciclan. Su trabajo permite asegurar que los equipos
                tengan un proceso adecuado de reutilización o reciclaje, reduciendo el impacto
                ambiental de los residuos tecnológicos.
              </p>
              <div class="colabs-card__grid">
                ${ColabLogo({ name: '⚙ RAEE', type: 'raee' })}
                ${ColabLogo({ name: 'RED VERDE', type: 'red-verde' })}
                ${ColabLogo({ name: '♲ ECO<br>CÓMPUTO', type: 'eco-computo' })}
                ${ColabLogo({ name: 'RESITER', type: 'resiter' })}
                ${ColabLogo({ name: 'recopila', type: 'recopila' })}
                ${ColabLogo({ name: '⏻ Full Circle<br>ELECTRONICS', type: 'full-circle' })}
                ${ColabLogo({ name: '🌿 RECO', type: 'reco' })}
                ${ColabLogo({ name: '⊙ VEOLIA', type: 'veolia' })}
                ${ColabLogo({ name: 'ecorecyclar', type: 'ecorecyclar' })}
              </div>
            </div>
          </div>
        </section>

        ${SharedFooter()}

      </div>
    `
  }

  // ─── Binding ──────────────────────────────────────────────────────────

  /** @override */
  _bindViewModel() {}

  /** @override */
  _bindEvents() {
    bindNavEvents(this)
    bindFooterEvents(this)
  }
}
