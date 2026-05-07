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
              En esta sección encontrarás las <strong>empresas</strong> y <strong>organizaciones</strong> que hacen posible el
              funcionamiento de SIMÖ. Gracias a su participación, la aplicación puede incentivar el reciclaje
              electrónico y ofrecer beneficios a quienes forman parte de esta iniciativa.
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
                <img src="./assets/styles/images/HyM.png" class="colabs-logo-img" alt="H&M" />
                <img src="./assets/styles/images/Koaj.png" class="colabs-logo-img" alt="KOAJ" />
                <img src="./assets/styles/images/Verdeo.png" class="colabs-logo-img" alt="Verdeo" />
                <img src="./assets/styles/images/Falabella.png" class="colabs-logo-img" alt="Falabella" />
                <img src="./assets/styles/images/Alkatronic.png" class="colabs-logo-img" alt="Alkatronic" />
                <img src="./assets/styles/images/Bettys.png" class="colabs-logo-img" alt="Bettys" />
                <img src="./assets/styles/images/PuntosColombia.png" class="colabs-logo-img" alt="Puntos Colombia" />
                <img src="./assets/styles/images/Jumbo.png" class="colabs-logo-img" alt="Jumbo" />
                <img src="./assets/styles/images/Acampar.png" class="colabs-logo-img" alt="Acampar" />
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
                dispositivos electrónicos reciclados. Su trabajo permite asegurar que los equipos
                tengan un proceso adecuado de reutilización o reciclaje, reduciendo el impacto
                ambiental de los residuos tecnológicos.
              </p>
              <div class="colabs-card__grid">
                <img src="./assets/styles/images/Rafe.png" class="colabs-logo-img colabs-logo-img--large" alt="RAEE" />
                <img src="./assets/styles/images/RedVerde.png" class="colabs-logo-img" alt="Red Verde" />
                <img src="./assets/styles/images/EcoComputo.png" class="colabs-logo-img" alt="Eco Computo" />
                <img src="./assets/styles/images/Resiter.png" class="colabs-logo-img colabs-logo-img--large" alt="Resiter" />
                <img src="./assets/styles/images/Recopila.png" class="colabs-logo-img" alt="Recopila" />
                <img src="./assets/styles/images/FullCircle.png" class="colabs-logo-img" alt="Full Circle" />
                <img src="./assets/styles/images/Reco.png" class="colabs-logo-img colabs-logo-img--large" alt="Reco" />
                <img src="./assets/styles/images/Veolia.png" class="colabs-logo-img" alt="Veolia" />
                <img src="./assets/styles/images/Ecorecyclar.png" class="colabs-logo-img colabs-logo-img--large" alt="Ecorecyclar" />
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
