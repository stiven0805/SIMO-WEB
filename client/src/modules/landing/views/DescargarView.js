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
import { bindNavEvents, bindFooterEvents } from './shared/landingShared.js'
import { PublicNav, SharedFooter } from '../../../shared/components/Layouts.js'
import { StepCard } from '../../../shared/components/Cards.js'
import { IconFlower } from '../../../shared/components/Icons.js'

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

        ${PublicNav('descargar')}

        <!-- ─── DESCARGAR HERO ─────────────────────────────────── -->
        <section class="download-hero">
          <div class="download-hero__inner">
            <div class="download-hero__content">
              <h1 class="download-hero__title">
                <span class="download-hero__title-small">Descarga</span>
                <span class="download-hero__title-big">
                  SIMÖ
                  <img src="./assets/styles/images/flor azul.png" class="download-hero__title-flower" alt="Flor" />
                </span>
              </h1>
              <p class="download-hero__text">
                Si te gusta esta iniciativa, <strong>descarga SIMÖ</strong> y forma parte de una
                comunidad que busca ayudar al planeta mientras también
                obtiene beneficios.
              </p>
              <p class="download-hero__text">
                Juntos <strong>podemos cuidarnos mutuamente:</strong> tú contribuyes al
                reciclaje electrónico y nosotros te ayudamos a generar un
                impacto positivo en el ambiente.
              </p>
            </div>
            <div class="download-hero__visual">
              <div class="download-hero__bubble">
                Haz <span class="download-hero__bubble-highlight">click en el botón</span> y
                descarga SIMÖ en Google
                Play para empezar a ayudar
                a nuestro planeta.
              </div>

              <div class="download-hero__robot-container">
                <img src="./assets/styles/images/simo bueno.png" class="download-hero__robot" alt="Robot SIMÖ" />
              </div>

              <a href="#" class="download-hero__play-btn">
                <img src="./assets/styles/images/play bueno.png" class="download-hero__play-img" alt="Get it on Google Play" />
              </a>

              <!-- Flores decorativas amarillas simétricas al mockup -->
              <img src="./assets/styles/images/Estrellainicio.png" class="download-hero__flower download-hero__flower--1" alt="" />
              <img src="./assets/styles/images/Estrellainicio.png" class="download-hero__flower download-hero__flower--2" alt="" />
              <img src="./assets/styles/images/Estrellainicio.png" class="download-hero__flower download-hero__flower--3" alt="" />
            </div>
          </div>
        </section>



        ${SharedFooter()}

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
