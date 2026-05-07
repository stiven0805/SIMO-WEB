/**
 * LandingView
 * ------------
 * Renderiza la interfaz de la Landing Page principal de SIMÖ.
 * Solo muestra: Nav + Hero + Ofertas + Colaboradores + Footer.
 *
 * Regla: NO contiene lógica de negocio.
 * Regla: SOLO se comunica con LandingViewModel.
 */

import { BaseView } from '../../../core/BaseView.js'
import { LandingViewModel } from '../viewmodels/LandingViewModel.js'
import { bindNavEvents, bindFooterEvents } from './shared/landingShared.js'
import { PublicNav, SharedFooter } from '../../../shared/components/Layouts.js'
import { OfferCard } from '../../../shared/components/Cards.js'
import { IconHeroFlower } from '../../../shared/components/Icons.js'

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

        ${PublicNav('home')}

        <!-- ─── HERO ────────────────────────────────────────────── -->
        <section class="landing-hero" id="hero">
          <!-- Solo decoraciones solicitadas -->

          <div class="landing-hero__inner">
            <div class="landing-hero__robot">
              <img
                src="./assets/styles/images/simo brazos levantados.png"
                alt="SIMÖ Robot Mascota"
                class="landing-hero__robot-img"
                id="robot-img"
              />
            </div>

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
                  <a href="#descargar" class="landing-nav__page-link" data-page="descargar">Descarga la aplicación</a> y empieza a reciclar de una manera sencilla,
                  consciente y con impacto positivo para el medio ambiente.
                </p>
              </div>
            </div>

          </div>

          <!-- Flores decorativas corregidas (mismo path que en DescargarView) -->
          <img src="./assets/styles/images/flor azul.png" class="landing-hero__decor landing-hero__decor--flower-1" alt="" />
          <img src="./assets/styles/images/flor azul.png" class="landing-hero__decor landing-hero__decor--flower-2" alt="" />
          <img src="./assets/styles/images/flor azul.png" class="landing-hero__decor landing-hero__decor--flower-3" alt="" />
          <img src="./assets/styles/images/flor azul.png" class="landing-hero__decor landing-hero__decor--flower-4" alt="" />
        </section>



        <!-- ─── OFFERS ──────────────────────────────────────────── -->
        <section class="landing-offers" id="ofertas">
          <!-- Decoraciones del mockup -->
          <img src="./assets/styles/images/DeoracionInicioSuperiorIzquierda.png" class="landing-offers__decor landing-offers__decor--top-left" alt="" />
          <img src="./assets/styles/images/DecoracionInicioInferiorDerecha.png" class="landing-offers__decor landing-offers__decor--bottom-right" alt="" />
          <img src="./assets/styles/images/Estrellainicio.png" class="landing-offers__decor landing-offers__decor--star-1" alt="" />
          <img src="./assets/styles/images/Estrellainicio.png" class="landing-offers__decor landing-offers__decor--star-2" alt="" />

          <div class="landing-offers__inner">
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

            <div class="landing-offers__grid-wrapper">
              <h3 class="landing-offers__grid-title">¡Recicladores buscan tus electrodomésticos!</h3>
              <div class="landing-offers__grid" id="offers-grid">
                ${(this._viewModel.getState('offers') || []).map(offer => OfferCard(offer)).join('')}
              </div>
              <p class="landing-offers__date">Próximamente · <span>18 de julio de 2026</span></p>
            </div>
          </div>
        </section>

        <!-- ─── COLLABORATORS ────────────────────────────────────── -->
        <section class="landing-collabs" id="colaboraciones">
          <img src="./assets/styles/images/DecoracionInicioInferiorIzquierda1.png" class="landing-collabs__decor landing-collabs__decor--bottom-left" alt="" />
          <img src="./assets/styles/images/DecoracionIinicioSuperiorIzquierda1.png" class="landing-collabs__decor landing-collabs__decor--top-left" alt="" />
          <img src="./assets/styles/images/DecoracionInicioSuperiorDerecha1.png" class="landing-collabs__decor landing-collabs__decor--top-right" alt="" />

          <div class="landing-collabs__inner">
            <h2 class="landing-collabs__title">¡Colaboradores en SIMÖ!</h2>
            <p class="landing-collabs__desc">
              Empresas y marcas aliadas que <strong>recompensan tu compromiso</strong> con el reciclaje.
              Acumula puntos en SIMÖ y canjéalos por beneficios, descuentos y experiencias
              sostenibles en nuestros establecimientos asociados.
            </p>
            <div class="landing-collabs__carousel">
              <div class="landing-collabs__track">
                ${this._renderCollabLogos()}
              </div>
            </div>
          </div>
        </section>

        ${SharedFooter()}

      </div>
    `
  }


  /**
   * Renderiza los logos de colaboradores para el carrusel.
   * @returns {string}
   */
  _renderCollabLogos() {
    const collaborators = this._viewModel.getState('collaborators') || []
    // Duplicamos los logos para crear un scroll infinito suave
    const tripled = [...collaborators, ...collaborators, ...collaborators]
    return tripled.map(collab => `
      <div class="landing-collabs__logo-item">
        <img src="./assets/styles/images/${collab.img}.png" alt="${collab.name}" class="landing-collabs__logo-img" />
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
    bindNavEvents(this)
    bindFooterEvents(this)

    // Smooth scroll para enlaces internos (secciones de esta misma página)
    const internalLinks = this.$$('a[href^="#"]')
    internalLinks.forEach(link => {
      if (link.classList.contains('landing-nav__page-link')) return
      this._addEvent(link, 'click', (event) => {
        const href = link.getAttribute('href')
        if (href && href.startsWith('#') && href.length > 1) {
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
