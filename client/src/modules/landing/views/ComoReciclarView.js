/**
 * ComoReciclarView
 * -----------------
 * Renderiza la página "Cómo reciclar" del menú dropdown de Ayuda.
 * Layout: Hero azul con título + 4 pasos numéricos + 4 mockups de celular + Footer.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con ComoReciclarViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { ComoReciclarViewModel } from '../viewmodels/ComoReciclarViewModel.js'
import { renderNav, renderFooter, bindNavEvents, bindFooterEvents } from './shared/landingShared.js'

export class ComoReciclarView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new ComoReciclarViewModel()
    super({ ...options, viewModel })
  }

  /**
   * Genera el HTML completo de la página "Cómo reciclar".
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
              <h1 class="ayuda-hero__title">Reciclar</h1>
              <p class="ayuda-hero__desc">
                Reciclar en SIMÖ es un <strong>proceso simple y accesible</strong> que te permite
                entregar tus dispositivos electrónicos de manera responsable,
                contribuyendo activamente al cuidado del medio ambiente.
              </p>
              <p class="ayuda-hero__desc">
                A través de un sistema fácil de usar, <strong>puedes registrar los
                equipos que deseas reciclar</strong>, coordinar su entrega y asegurarte
                de que sean gestionados correctamente.
              </p>
            </div>

            <div class="ayuda-hero__steps">
              ${this._renderHeroStep(1, 'Desde la pantalla principal, <strong>ingresa al menú</strong> de Opciones y selecciona la sección Reciclar para comenzar el proceso.')}
              ${this._renderHeroStep(2, 'Selecciona el tipo de dispositivo que deseas entregar. La aplicación mostrará categorías para facilitar la selección.')}
              ${this._renderHeroStep(3, 'Escoge si deseas llevar el dispositivo a un punto de recolección o solicitar recogida.')}
              ${this._renderHeroStep(4, 'Revisa la información y <strong>confirma la solicitud.</strong> El estado cambiará cuando el proceso sea validado.')}
            </div>
          </div>
        </section>

        <!-- ─── MOCKUPS ────────────────────────────────────────── -->
        <section class="ayuda-mockups">
          <div class="ayuda-mockups__inner">
            ${this._renderMockupsReciclar()}
          </div>
        </section>

        ${renderFooter()}

      </div>
    `
  }

  // ─── Helpers de renderizado ────────────────────────────────────────────────

  /**
   * Renderiza las decoraciones del hero (flor, triángulos, diamante).
   * @returns {string}
   */
  _renderHeroDecorations() {
    const flowerSvg = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="38" y="5" width="24" height="90" rx="2" fill="#DB0076"/>
        <rect x="5" y="38" width="90" height="24" rx="2" fill="#DB0076"/>
        <rect x="18" y="18" width="24" height="64" rx="2" fill="#DB0076" transform="rotate(45 50 50)"/>
        <rect x="18" y="18" width="64" height="24" rx="2" fill="#DB0076" transform="rotate(45 50 50)"/>
        <circle cx="50" cy="50" r="18" fill="#DB0076"/>
        <circle cx="50" cy="50" r="13" fill="#FFCD1C"/>
      </svg>
    `
    return `
      <div class="ayuda-hero__decor ayuda-hero__decor--flower-1">${flowerSvg}</div>
      <div class="ayuda-hero__decor ayuda-hero__decor--diamond">◆</div>
      <div class="ayuda-hero__decor ayuda-hero__decor--triangle-1">▲</div>
      <div class="ayuda-hero__decor ayuda-hero__decor--triangle-2">▶</div>
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
   * Renderiza los 4 mockups de celular para "Cómo Reciclar".
   * @returns {string}
   */
  _renderMockupsReciclar() {
    const steps = [
      { num: 1, label: 'Desde la pantalla principal, ingresa al menú de Opciones y selecciona la sección Reciclar para comenzar el proceso.', color: '#FFCD1C' },
      { num: 2, label: 'Selecciona el tipo de dispositivo que deseas entregar. La aplicación mostrará categorías para facilitar la selección.', color: '#DB0076' },
      { num: 3, label: 'Escoge si deseas llevar el dispositivo a un punto de recolección o solicitar recogida.', color: '#FFCD1C' },
      { num: 4, label: 'Revisa la información y confirma la solicitud. El estado cambiará cuando el proceso sea validado.', color: '#334E9D' },
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
            <div class="ayuda-phone__block" style="background:${accentColor}; height: 28px; border-radius: 6px; margin-bottom: 8px;"></div>
            <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px;"></div>
            <div class="ayuda-phone__block" style="background: #eee; height: 14px; border-radius: 4px; margin-bottom: 6px; width: 70%;"></div>
            <div class="ayuda-phone__block" style="background: ${accentColor}33; height: 40px; border-radius: 8px; margin-top: 8px;"></div>
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
