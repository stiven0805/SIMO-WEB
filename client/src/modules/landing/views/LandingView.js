/**
 * LandingView
 * ------------
 * Renderiza la interfaz de la Landing Page de SIMÖ.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con LandingViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { LandingViewModel } from '../viewmodels/LandingViewModel.js'

export class LandingView extends BaseView {
  constructor(options = {}) {
    const viewModel = options.viewModel || new LandingViewModel()
    super({ ...options, viewModel })
  }

  // ─── Renderizado inicial ──────────────────────────────────────────────────

  /**
   * Genera el HTML completo de la landing page SIMÖ.
   * @returns {string}
   */
  render() {
    return `
      <div class="landing">

        <!-- ─── NAV ─────────────────────────────────────────────────── -->
        <header class="landing-nav">
          <div class="landing-nav__inner">
            <div class="landing-nav__brand">
              <span class="landing-nav__logo">SIMÖ</span>
            </div>
            <nav class="landing-nav__links">
              <a href="#quienes-somos" class="landing-nav__link">Quiénes somos</a>
              <a href="#descargar" class="landing-nav__link">Descargar</a>
              <a href="#ayuda" class="landing-nav__link landing-nav__link--dropdown">Ayuda Con la app</a>
              <a href="#colaboraciones" class="landing-nav__link">Colaboraciones</a>
            </nav>
          </div>
        </header>

        <!-- ─── HERO ────────────────────────────────────────────────── -->
        <section class="landing-hero" id="hero">
          <!-- Decorations -->
          ${this._renderHeroDecorations()}

          <div class="landing-hero__inner">
            <!-- Robot mascot -->
            <div class="landing-hero__robot">
              <img
                src="./assets/images/robot-simo.png"
                alt="SIMÖ Robot Mascota"
                class="landing-hero__robot-img"
                id="robot-img"
              />
            </div>

            <!-- Content -->
            <div class="landing-hero__content">
              <p class="landing-hero__greeting" id="landing-greeting">Hola soy</p>
              <h1 class="landing-hero__title" id="landing-title">SIMÖ</h1>
              <p class="landing-hero__subtitle">Únete a nosotros</p>

              <div class="landing-hero__text-block">
                <p class="landing-hero__text">
                  Soy SIMÖ, <strong>una iniciativa creada para ayudarte a reciclar tus
                  dispositivos electrónicos</strong> de forma fácil, responsable y con
                  beneficios para ti.
                </p>
              </div>

              <div class="landing-hero__text-block">
                <p class="landing-hero__text">
                  Te acompaño en el proceso de <strong>darle otra vida a la tecnología</strong>,
                  conectándote con opciones de reciclaje seguras mientras ganas
                  recompensas por cuidar el planeta.
                </p>
              </div>

              <div class="landing-hero__text-block">
                <p class="landing-hero__text">
                  <a href="#descargar">Descarga la aplicación</a> y empieza a reciclar de una manera sencilla,
                  consciente y con impacto positivo para el medio ambiente.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ─── WAVE TRANSITION ──────────────────────────────────────── -->
        <div class="landing-wave">
          <span class="landing-wave__star">✦</span>
          <svg class="landing-wave__svg" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0C360 70 1080 70 1440 0V80H0V0Z" fill="#FFFCE7"/>
            <path d="M0 0C360 70 1080 70 1440 0" stroke="#DB0076" stroke-width="0" fill="#DB0076" opacity="0.0"/>
            <path d="M0 10C360 80 1080 80 1440 10V0C1080 70 360 70 0 0Z" fill="#DB0076"/>
          </svg>
        </div>

        <!-- ─── OFFERS ──────────────────────────────────────────────── -->
        <section class="landing-offers" id="ofertas">
          <div class="landing-offers__inner">
            <!-- Left text -->
            <div class="landing-offers__text">
              <h2 class="landing-offers__title">
                <span class="landing-offers__title-top">¡Ofertas</span>
                <span class="landing-offers__title-bottom">próximas!</span>
              </h2>
              <p class="landing-offers__desc">
                Muy pronto en Simo encontrarás <strong>ofertas y beneficios</strong>
                especiales diseñados para premiar tu compromiso con el
                reciclaje electrónico.
              </p>
              <p class="landing-offers__desc">
                Al reciclar tus dispositivos podrás acceder a <strong>recompensas
                exclusivas, descuentos en marcas aliadas</strong> y experiencias
                sostenibles que impulsan un estilo de vida más consciente.
              </p>
              <p class="landing-offers__desc">
                Estas ofertas estarán disponibles <strong>dentro de la aplicación</strong> y se
                actualizarán constantemente para que cada acción que realices
                tenga un impacto positivo, tanto para ti como para el planeta.
              </p>
            </div>

            <!-- Right grid -->
            <div class="landing-offers__grid-wrapper">
              <h3 class="landing-offers__grid-title">¡Recicladores buscan tus electrodomésticos!</h3>
              <div class="landing-offers__grid" id="offers-grid">
                ${this._renderOfferCards()}
              </div>
              <p class="landing-offers__date">Próximamente · <span>18 de julio de 2026</span></p>
            </div>
          </div>
        </section>

        <!-- ─── COLLABORATORS ────────────────────────────────────────── -->
        <section class="landing-collabs" id="colaboraciones">
          <div class="landing-collabs__inner">
            <h2 class="landing-collabs__title">¡Colaboradores en SIMÖ!</h2>
            <p class="landing-collabs__desc">
              Empresas y marcas aliadas que <strong>recompensan tu compromiso</strong> con el reciclaje.
              Acumula puntos en SIMÖ y canjéalos por beneficios, descuentos y experiencias
              sostenibles en nuestros establecimientos asociados.
            </p>
            <div class="landing-collabs__carousel">
              <div class="landing-collabs__track" id="collabs-track">
                ${this._renderCollabLogos()}
                ${this._renderCollabLogos()}
              </div>
            </div>
          </div>
        </section>

        <!-- ─── FOOTER ──────────────────────────────────────────────── -->
        <footer class="landing-footer">
          <div class="landing-footer__inner">
            <!-- Top: logo + social -->
            <div class="landing-footer__top">
              <span class="landing-footer__logo">SIMÖ</span>
              <div class="landing-footer__social">
                <a href="#" class="landing-footer__social-link" aria-label="Twitter">𝕏</a>
                <a href="#" class="landing-footer__social-link" aria-label="YouTube">▶</a>
                <a href="#" class="landing-footer__social-link" aria-label="Google">G</a>
                <a href="#" class="landing-footer__social-link" aria-label="Instagram">📷</a>
                <a href="#" class="landing-footer__social-link" aria-label="Facebook">f</a>
              </div>
            </div>

            <!-- Columns -->
            <div class="landing-footer__columns">
              <div class="landing-footer__col">
                <p class="landing-footer__col-title">Aplicación</p>
                <a href="#" class="landing-footer__col-link">Descargar app</a>
                <a href="#" class="landing-footer__col-link">Dispositivos disponibles</a>
              </div>
              <div class="landing-footer__col">
                <p class="landing-footer__col-title">Beneficios</p>
                <a href="#" class="landing-footer__col-link">Próximas ofertas</a>
                <a href="#" class="landing-footer__col-link">Empresas colaboradoras</a>
              </div>
              <div class="landing-footer__col">
                <p class="landing-footer__col-title">¿Qué somos?</p>
                <a href="#" class="landing-footer__col-link">Nuestros ideales</a>
              </div>
              <div class="landing-footer__col">
                <p class="landing-footer__col-title">Ayuda</p>
                <a href="#" class="landing-footer__col-link">Correo de soporte</a>
              </div>
            </div>

            <!-- Bottom -->
            <div class="landing-footer__bottom">
              <p class="landing-footer__copy">© 2026 SIMÖ – Reciclar para transformar</p>
              <a href="#" class="landing-footer__terms">Términos y condiciones</a>
            </div>
          </div>
        </footer>

      </div>
    `
  }

  // ─── Helpers de renderizado ────────────────────────────────────────────────

  /**
   * Renderiza las decoraciones geométricas del hero (flores, triángulos, etc.).
   * @returns {string}
   */
  _renderHeroDecorations() {
    const flowerSvg = `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <rect x="45" y="5" width="30" height="110" rx="2" fill="#FFCD1C"/>
        <rect x="5" y="45" width="110" height="30" rx="2" fill="#FFCD1C"/>
        <rect x="21" y="21" width="30" height="78" rx="2" fill="#FFCD1C" transform="rotate(45 60 60)"/>
        <rect x="21" y="21" width="78" height="30" rx="2" fill="#FFCD1C" transform="rotate(45 60 60)"/>
        <circle cx="60" cy="60" r="22" fill="#FFCD1C"/>
        <circle cx="60" cy="60" r="17" fill="#334E9D"/>
      </svg>
    `
    return `
      <div class="landing-hero__flower landing-hero__flower--big">${flowerSvg}</div>
      <div class="landing-hero__flower landing-hero__flower--small">${flowerSvg}</div>
      <div class="landing-hero__circle landing-hero__circle--blue"></div>
      <div class="landing-hero__circle landing-hero__circle--yellow-ring"></div>
      <div class="landing-hero__triangle landing-hero__triangle--yellow-1"></div>
      <div class="landing-hero__triangle landing-hero__triangle--yellow-2"></div>
      <div class="landing-hero__dot landing-hero__dot--1"></div>
      <div class="landing-hero__dot landing-hero__dot--2"></div>
    `
  }

  /**
   * Renderiza las tarjetas de ofertas con datos del ViewModel.
   * @returns {string}
   */
  _renderOfferCards() {
    const offers = this._viewModel.getState('offers') || []
    return offers.map(offer => `
      <div class="offer-card">
        <div class="offer-card__icon-wrapper">
          <span class="offer-card__badge">${offer.quantity}</span>
          <span class="offer-card__icon">${offer.icon}</span>
        </div>
        <div class="offer-card__points">
          <span class="offer-card__points-icon">🪙</span>
          ${offer.points}
        </div>
        <p class="offer-card__name">${offer.name}</p>
        <p class="offer-card__dest">Destino: ${offer.destination}</p>
      </div>
    `).join('')
  }

  /**
   * Renderiza los logos de colaboradores para el carrusel.
   * Se llama dos veces en render() para crear el efecto de scroll infinito.
   * @returns {string}
   */
  _renderCollabLogos() {
    const collaborators = this._viewModel.getState('collaborators') || []
    return collaborators.map(collab => `
      <div class="landing-collabs__logo-item">
        <span class="landing-collabs__logo-text landing-collabs__logo-text--${collab.type}">
          ${collab.name}
        </span>
      </div>
    `).join('')
  }

  // ─── Binding del ViewModel ────────────────────────────────────────────────

  /**
   * Se suscribe a cambios de estado del ViewModel para actualizar el DOM.
   */
  _bindViewModel() {
    this._subscribe('title', title => {
      const el = this.$('#landing-title')
      if (el) el.textContent = title
    })

    this._subscribe('greeting', greeting => {
      const el = this.$('#landing-greeting')
      if (el) el.textContent = greeting
    })
  }

  // ─── Binding de eventos DOM ───────────────────────────────────────────────

  /**
   * Enlaza los botones de la UI con los comandos del ViewModel.
   */
  _bindEvents() {
    // Smooth scroll para enlaces internos del nav
    const navLinks = this.$$('.landing-nav__link')
    navLinks.forEach(link => {
      this._addEvent(link, 'click', (event) => {
        const href = link.getAttribute('href')
        if (href && href.startsWith('#')) {
          event.preventDefault()
          const targetSection = document.querySelector(href)
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' })
          }
        }
      })
    })
  }
}
