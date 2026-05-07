/**
 * ComoCanjarView
 * ---------------
 * Renderiza la página "Cómo canjear recompensas" del menú dropdown de Ayuda.
 * Layout: Hero azul con título + 4 pasos numéricos + 4 mockups de celular + Footer.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con ComoCanjarViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { ComoCanjarViewModel } from '../viewmodels/ComoCanjarViewModel.js'
import { bindNavEvents, bindFooterEvents } from './shared/landingShared.js'
import { PublicNav, SharedFooter, AyudaHeroDecorations } from '../../../shared/components/Layouts.js'
import { HeroAyudaStep, AyudaPhoneMockup } from '../../../shared/components/Cards.js'
import { IconFlower } from '../../../shared/components/Icons.js'

export class ComoCanjarView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new ComoCanjarViewModel()
    super({ ...options, viewModel })
  }

  /**
   * Genera el HTML completo de la página "Cómo canjear recompensas".
   * @returns {string}
   */
  render() {
    return `
      <div class="landing">

        ${PublicNav('', 'blue')}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="ayuda-hero ayuda-hero--blue">
          <div class="ayuda-hero__inner">
            <div class="ayuda-hero__content">
              <p class="ayuda-hero__pre">Cómo</p>
              <h1 class="ayuda-hero__title ayuda-hero__title--yellow">canjear</h1>
              <p class="ayuda-hero__desc">
                Los puntos acumulados <strong>pueden convertirse en beneficios</strong>
                dentro de las empresas colaboradoras.
              </p>
              <p class="ayuda-hero__desc">
                permitiéndote acceder a <strong>recompensas</strong>, descuentos y
                experiencias mientras apoyas iniciativas sostenibles y fomentas
                un impacto positivo en el cuidado del medio ambiente.
              </p>
            </div>

            <div class="ayuda-hero__steps">
              ${HeroAyudaStep(1, 'Ingresa a la sección <strong>Recompensas o Canjear</strong> desde el menú principal.')}
              ${HeroAyudaStep(2, '<strong>Visualiza las ofertas disponibles</strong> y revisa cuántos puntos necesitas.')}
              ${HeroAyudaStep(3, 'Elige el beneficio que <strong>deseas canjear.</strong>')}
              ${HeroAyudaStep(4, 'Confirma la acción y <strong>recibe tu cupón</strong> en tu correo electrónico.')}
            </div>
          </div>
        </section>

        <!-- ─── MOCKUPS ────────────────────────────────────────── -->
        <section class="ayuda-mockups">
          <div class="ayuda-mockups__inner">
            ${[
        { num: 1, label: 'Ingresa a la sección <span style="color:#334E9D; font-weight:700;">Recompensas o Canjear</span> desde el menú principal.', img: 'celular rosa 1' },
        { num: 2, label: '<span style="color:#334E9D; font-weight:700;">Visualiza las ofertas disponibles</span> y revisa cuántos puntos necesitas.', img: 'celular rosa 2' },
        { num: 3, label: 'Elige el beneficio que <span style="color:#334E9D; font-weight:700;">deseas canjear.</span>', img: 'celular rosa 3' },
        { num: 4, label: 'Confirma la acción y <span style="color:#334E9D; font-weight:700;">recibe tu cupón</span> en tu correo electrónico.', img: 'celular rosa 4' },
      ].map(s => `
              <div class="ayuda-mockups__item">
                <span class="ayuda-mockups__step-num">${s.num}</span>
                <img src="./assets/styles/images/${s.img}.png" class="ayuda-mockups__phone-img" alt="Paso ${s.num}" />
                <p class="ayuda-mockups__caption">${s.label}</p>
              </div>
            `).join('')}
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
    bindNavEvents(this)
    bindFooterEvents(this)
  }
}
