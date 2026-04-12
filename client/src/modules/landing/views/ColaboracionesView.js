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
import { renderNav, renderFooter, bindNavEvents, bindFooterEvents } from './shared/landingShared.js'

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

        ${renderNav('colaboraciones')}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="colabs-hero">
          ${this._renderHeroDecos()}
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
                ${this._renderLogoHM()}
                ${this._renderLogoKoaj()}
                ${this._renderLogoVerdeo()}
                ${this._renderLogoFalabella()}
                ${this._renderLogoAlkatronic()}
                ${this._renderLogoBettys()}
                ${this._renderLogoPuntos()}
                ${this._renderLogoJumbo()}
                ${this._renderLogoElo()}
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
                ${this._renderLogoRaee()}
                ${this._renderLogoRedVerde()}
                ${this._renderLogoEcoComputo()}
                ${this._renderLogoResiter()}
                ${this._renderLogoRecopila()}
                ${this._renderLogoFullCircle()}
                ${this._renderLogoReco()}
                ${this._renderLogoVeolia()}
                ${this._renderLogoEcorecyclar()}
              </div>
            </div>
          </div>
        </section>

        ${renderFooter()}

      </div>
    `
  }

  // ─── Decoraciones Hero ──────────────────────────────────────────────────

  /**
   * Renderiza las decoraciones del hero (líneas curvas blancas).
   * @returns {string}
   */
  _renderHeroDecos() {
    return `
      <div class="colabs-hero__deco colabs-hero__deco--left">
        <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 10 Q20 60 80 100 Q20 140 100 190" stroke="rgba(255,255,255,0.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="colabs-hero__deco colabs-hero__deco--right">
        <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10 Q100 60 40 100 Q100 140 20 190" stroke="rgba(255,255,255,0.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
    `
  }

  // ─── Logos Empresas que Recompensan ────────────────────────────────────

  _renderLogoHM() {
    return `<div class="colabs-logo colabs-logo--hm"><span>H&amp;M</span></div>`
  }
  _renderLogoKoaj() {
    return `<div class="colabs-logo colabs-logo--koaj"><span>KOAJ</span></div>`
  }
  _renderLogoVerdeo() {
    return `<div class="colabs-logo colabs-logo--verdeo"><span>verdeo</span></div>`
  }
  _renderLogoFalabella() {
    return `<div class="colabs-logo colabs-logo--falabella"><span>falabella.</span></div>`
  }
  _renderLogoAlkatronic() {
    return `<div class="colabs-logo colabs-logo--alkatronic"><span>⬛ Alkatronic<br><small>professional</small></span></div>`
  }
  _renderLogoBettys() {
    return `<div class="colabs-logo colabs-logo--bettys"><span>Betty's<br>bowls</span></div>`
  }
  _renderLogoPuntos() {
    return `<div class="colabs-logo colabs-logo--puntos"><span>Ⓟ Puntos<br>Colombia</span></div>`
  }
  _renderLogoJumbo() {
    return `<div class="colabs-logo colabs-logo--jumbo"><span>JUMBO</span></div>`
  }
  _renderLogoElo() {
    return `<div class="colabs-logo colabs-logo--elo"><span>∼elo∼</span></div>`
  }

  // ─── Logos Empresas de Recolección ────────────────────────────────────

  _renderLogoRaee() {
    return `<div class="colabs-logo colabs-logo--raee"><span>⚙ RAEE</span></div>`
  }
  _renderLogoRedVerde() {
    return `<div class="colabs-logo colabs-logo--red-verde"><span>RED VERDE</span></div>`
  }
  _renderLogoEcoComputo() {
    return `<div class="colabs-logo colabs-logo--eco-computo"><span>♲ ECO<br>CÓMPUTO</span></div>`
  }
  _renderLogoResiter() {
    return `<div class="colabs-logo colabs-logo--resiter"><span>RESITER</span></div>`
  }
  _renderLogoRecopila() {
    return `<div class="colabs-logo colabs-logo--recopila"><span>recopila</span></div>`
  }
  _renderLogoFullCircle() {
    return `<div class="colabs-logo colabs-logo--full-circle"><span>⏻ Full Circle<br>ELECTRONICS</span></div>`
  }
  _renderLogoReco() {
    return `<div class="colabs-logo colabs-logo--reco"><span>🌿 RECO</span></div>`
  }
  _renderLogoVeolia() {
    return `<div class="colabs-logo colabs-logo--veolia"><span>⊙ VEOLIA</span></div>`
  }
  _renderLogoEcorecyclar() {
    return `<div class="colabs-logo colabs-logo--ecorecyclar"><span>ecorecyclar</span></div>`
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
