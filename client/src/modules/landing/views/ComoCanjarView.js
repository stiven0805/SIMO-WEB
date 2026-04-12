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
import { renderNav, renderFooter, bindNavEvents, bindFooterEvents } from './shared/landingShared.js'

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

        ${renderNav('', 'blue')}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="ayuda-hero ayuda-hero--blue">
          ${this._renderHeroDecorations()}
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
              ${this._renderHeroStep(1, 'Ingresa a la sección <strong>Recompensas o Canjear</strong> desde el menú principal.')}
              ${this._renderHeroStep(2, '<strong>Visualiza las ofertas disponibles</strong> y revisa cuántos puntos necesitas.')}
              ${this._renderHeroStep(3, 'Elige el beneficio que <strong>deseas canjear.</strong>')}
              ${this._renderHeroStep(4, 'Confirma la acción y <strong>recibe tu cupón</strong> en tu correo electrónico.')}
            </div>
          </div>
        </section>

        <!-- ─── MOCKUPS ────────────────────────────────────────── -->
        <section class="ayuda-mockups">
          <div class="ayuda-mockups__inner">
            ${this._renderMockupsCanjar()}
          </div>
        </section>

        ${renderFooter()}

      </div>
    `
  }

  // ─── Helpers de renderizado ────────────────────────────────────────────────

  /**
   * Renderiza las decoraciones del hero.
   * @returns {string}
   */
  _renderHeroDecorations() {
    const flowerSvg = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="38" y="5" width="24" height="90" rx="2" fill="#FFCD1C"/>
        <rect x="5" y="38" width="90" height="24" rx="2" fill="#FFCD1C"/>
        <rect x="18" y="18" width="24" height="64" rx="2" fill="#FFCD1C" transform="rotate(45 50 50)"/>
        <rect x="18" y="18" width="64" height="24" rx="2" fill="#FFCD1C" transform="rotate(45 50 50)"/>
        <circle cx="50" cy="50" r="18" fill="#FFCD1C"/>
        <circle cx="50" cy="50" r="13" fill="#DB0076"/>
      </svg>
    `
    return `
      <div class="ayuda-hero__decor ayuda-hero__decor--flower-1">${flowerSvg}</div>
      <div class="ayuda-hero__decor ayuda-hero__decor--diamond">◆</div>
    `
  }

  /**
   * Renderiza un paso numerado del hero.
   * @param {number} num
   * @param {string} text - Texto HTML del paso
   * @returns {string}
   */
  _renderHeroStep(num, text) {
    return `
      <div class="ayuda-hero__step">
        <span class="ayuda-hero__step-num">${num}</span>
        <p class="ayuda-hero__step-text">${text}</p>
      </div>
    `
  }

  /**
   * Renderiza los 4 mockups para "Cómo Canjear".
   * @returns {string}
   */
  _renderMockupsCanjar() {
    const steps = [
      { num: 1, label: 'Ingresa a la sección Recompensas o Canjear desde el menú principal.', color: '#FFCD1C' },
      { num: 2, label: 'Visualiza las ofertas disponibles y revisa cuántos puntos necesitas.', color: '#FFCD1C' },
      { num: 3, label: 'Elige el beneficio que deseas canjear.', color: '#DB0076' },
      { num: 4, label: 'Confirma la acción y recibe tu cupón en tu correo electrónico.', color: '#DB0076' },
    ]
    return steps.map(s => `
      <div class="ayuda-mockups__item">
        <span class="ayuda-mockups__step-num">${s.num}</span>
        ${this._renderPhoneMockup(s.color)}
        <p class="ayuda-mockups__caption">${s.label}</p>
      </div>
    `).join('')
  }

  /**
   * Renderiza un mockup de teléfono simple con color de acento.
   * @param {string} accentColor
   * @returns {string}
   */
  _renderPhoneMockup(accentColor) {
    return `
      <div class="ayuda-phone">
        <div class="ayuda-phone__screen">
          <div class="ayuda-phone__topbar">
            <span class="ayuda-phone__logo">SIMÖ</span>
          </div>
          <div class="ayuda-phone__body">
            <div class="ayuda-phone__points-badge" style="background:${accentColor};">
              <span>🪙</span>
              <strong>1100</strong>
            </div>
            <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px;"></div>
            <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px; width: 75%;"></div>
            <div style="display:flex; gap:6px; margin-top:8px;">
              <div style="background:#e8e8e8; border-radius:6px; height: 28px; flex:1;"></div>
              <div style="background:#e8e8e8; border-radius:6px; height: 28px; flex:1;"></div>
            </div>
          </div>
          <div class="ayuda-phone__bottombar">
            <span>⌂</span><span>☰</span><span>◻</span><span>👤</span>
          </div>
        </div>
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
