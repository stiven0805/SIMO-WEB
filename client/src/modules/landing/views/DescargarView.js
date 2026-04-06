/**
 * DescargarView
 * ──────────────
 * Renderiza la página "Descargar" de SIMÖ.
 * Pantalla independiente para la descarga de la app.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con DescargarViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { DescargarViewModel } from '../viewmodels/DescargarViewModel.js'
import { renderNav, renderFooter, bindNavEvents, bindFooterEvents } from './shared/landingShared.js'

export class DescargarView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new DescargarViewModel()
    super({ ...options, viewModel })
  }

  // ─── Renderizado ──────────────────────────────────────────────────────────

  /**
   * Genera el HTML completo de la página de Descarga.
   * @returns {string}
   */
  render() {
    return `
      <div class="landing">

        ${renderNav('descargar')}

        <!-- ─── DESCARGAR HERO ─────────────────────────────────── -->
        <section class="download-hero">
          <div class="download-hero__inner">
            <div class="download-hero__content">
              <h1 class="download-hero__title">Descarga <span>SIMÖ</span></h1>
              <p class="download-hero__subtitle">¡Comienza a reciclar desde tu teléfono!</p>
              <p class="download-hero__text">
                Descarga nuestra aplicación y empieza a <strong>reciclar tus
                dispositivos electrónicos</strong> de forma fácil y segura.
                Gana recompensas por cada dispositivo que recicles y
                contribuye a un planeta más sostenible.
              </p>
              <div class="download-hero__stores">
                <a href="#" class="download-hero__store-btn download-hero__store-btn--google" id="download-google-play">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.196 12l2.502-2.492zM5.864 2.658L16.8 9.99l-2.302 2.302L5.864 2.658z"/>
                  </svg>
                  <div class="download-hero__store-text">
                    <span class="download-hero__store-label">DESCÁRGALA EN</span>
                    <span class="download-hero__store-name">Google Play</span>
                  </div>
                </a>
                <a href="#" class="download-hero__store-btn download-hero__store-btn--apple" id="download-app-store">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div class="download-hero__store-text">
                    <span class="download-hero__store-label">DESCÁRGALA EN</span>
                    <span class="download-hero__store-name">App Store</span>
                  </div>
                </a>
              </div>
              <div class="download-hero__features">
                <div class="download-hero__feature">
                  <span class="download-hero__feature-icon">🔄</span>
                  <span class="download-hero__feature-text">Recicla fácil</span>
                </div>
                <div class="download-hero__feature">
                  <span class="download-hero__feature-icon">🏆</span>
                  <span class="download-hero__feature-text">Gana puntos</span>
                </div>
                <div class="download-hero__feature">
                  <span class="download-hero__feature-icon">🌍</span>
                  <span class="download-hero__feature-text">Cuida el planeta</span>
                </div>
              </div>
            </div>
            <div class="download-hero__visual">
              <div class="download-hero__phone-mockup">
                <div class="download-hero__phone-screen">
                  <div class="download-hero__phone-header">
                    <span class="download-hero__phone-logo">SIMÖ</span>
                  </div>
                  <div class="download-hero__phone-body">
                    <p class="download-hero__phone-greeting">¡Hola!</p>
                    <p class="download-hero__phone-text">Empieza a reciclar hoy</p>
                    <div class="download-hero__phone-cards">
                      <div class="download-hero__phone-card download-hero__phone-card--yellow"></div>
                      <div class="download-hero__phone-card download-hero__phone-card--blue"></div>
                    </div>
                  </div>
                </div>
              </div>
              ${this._renderDecorations()}
            </div>
          </div>
        </section>

        <!-- ─── PASOS PARA DESCARGAR ──────────────────────────── -->
        <section class="download-steps">
          <div class="download-steps__inner">
            <h2 class="download-steps__title">¿Cómo <span>empezar</span>?</h2>
            <div class="download-steps__grid">
              <div class="download-steps__card">
                <div class="download-steps__card-number">1</div>
                <h3 class="download-steps__card-title">Descarga la app</h3>
                <p class="download-steps__card-desc">Descarga SIMÖ desde Google Play o App Store completamente gratis.</p>
              </div>
              <div class="download-steps__card">
                <div class="download-steps__card-number">2</div>
                <h3 class="download-steps__card-title">Regístrate</h3>
                <p class="download-steps__card-desc">Crea tu cuenta en pocos segundos con tu correo electrónico.</p>
              </div>
              <div class="download-steps__card">
                <div class="download-steps__card-number">3</div>
                <h3 class="download-steps__card-title">Empieza a reciclar</h3>
                <p class="download-steps__card-desc">Registra tus dispositivos, ubica puntos de recolección y gana recompensas.</p>
              </div>
            </div>
          </div>
        </section>

        ${renderFooter()}

      </div>
    `
  }

  // ─── Helpers de renderizado ────────────────────────────────────────────────

  /**
   * Renderiza las decoraciones visuales alrededor del teléfono.
   * @returns {string}
   */
  _renderDecorations() {
    return `
      <div class="download-hero__decor">
        <div class="download-hero__decor-circle download-hero__decor-circle--1"></div>
        <div class="download-hero__decor-circle download-hero__decor-circle--2"></div>
        <svg class="download-hero__decor-flower" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="38" y="5" width="24" height="90" rx="2" fill="#FFCD1C"/>
          <rect x="5" y="38" width="90" height="24" rx="2" fill="#FFCD1C"/>
          <rect x="18" y="18" width="24" height="64" rx="2" fill="#FFCD1C" transform="rotate(45 50 50)"/>
          <rect x="18" y="18" width="64" height="24" rx="2" fill="#FFCD1C" transform="rotate(45 50 50)"/>
          <circle cx="50" cy="50" r="18" fill="#FFCD1C"/>
          <circle cx="50" cy="50" r="13" fill="#DB0076"/>
        </svg>
      </div>
    `
  }

  // ─── Binding del ViewModel ────────────────────────────────────────────────

  /** @override */
  _bindViewModel() {
    // Esta vista no tiene estado reactivo
  }

  // ─── Binding de eventos DOM ───────────────────────────────────────────────

  /** @override */
  _bindEvents() {
    bindNavEvents(this)
    bindFooterEvents(this)
  }
}
