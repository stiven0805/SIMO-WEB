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
import { bindNavEvents, bindFooterEvents } from './shared/landingShared.js'
import { PublicNav, SharedFooter, AyudaHeroDecorations } from '../../../shared/components/Layouts.js'
import { HeroAyudaStep, AyudaPhoneMockup } from '../../../shared/components/Cards.js'
import { IconFlower } from '../../../shared/components/Icons.js'

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

        ${PublicNav('', 'blue')}

        <!-- ─── HERO ──────────────────────────────────────────── -->
        <section class="ayuda-hero ayuda-hero--blue">
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
              ${HeroAyudaStep(1, 'Desde la pantalla principal, <strong>ingresa al menú</strong> de Opciones y selecciona la sección Reciclar para comenzar el proceso.')}
              ${HeroAyudaStep(2, 'Selecciona el tipo de dispositivo que deseas entregar. La aplicación mostrará categorías para facilitar la selección.')}
              ${HeroAyudaStep(3, 'Escoge si deseas llevar el dispositivo a un punto de recolección o solicitar recogida.')}
              ${HeroAyudaStep(4, 'Revisa la información y <strong>confirma la solicitud.</strong> El estado cambiará cuando el proceso sea validado.')}
            </div>
          </div>
        </section>

        <!-- ─── MOCKUPS ────────────────────────────────────────── -->
        <section class="ayuda-mockups">
          <div class="ayuda-mockups__inner">
            ${[
        { num: 1, label: 'Desde la pantalla principal, <span style="color:#334E9D; font-weight:700;">ingresa al menú de Opciones</span> y selecciona la sección Reciclar para comenzar el proceso.', img: 'celular 1' },
        { num: 2, label: 'Selecciona el tipo de dispositivo que deseas entregar. <span style="color:#334E9D; font-weight:700;">La aplicación mostrará categorías</span> para facilitar la selección.', img: 'celular 2' },
        { num: 3, label: '<span style="color:#334E9D; font-weight:700;">Escoge si deseas</span> llevar el dispositivo a un punto de recolección o solicitar recogida.', img: 'celular 3' },
        { num: 4, label: '<span style="color:#334E9D; font-weight:700;">Revisa la información y confirma la solicitud.</span> El estado cambiará cuando el proceso sea validado.', img: 'celular 4' },
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
